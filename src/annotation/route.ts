import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Controller, Middleware } from '../declarations';
import { middlewareContainer } from '../declarations/inversify';
import { RouteConfig, RouteRequest, RouteResponse } from '../typings/request-response-type';
import { RouteType } from '../typings/route';

const ExpressFunctionPrefix: string = 'express_';

function addRequestContext(request: { context?: Record<string, unknown> }): void {
  if (!request.context) {
    request.context = {};
  }
}

function handleErrorResponse(response: Response, error: Error & { code?: number }): void {
  const { message } = error;
  response.status(typeof error.code === 'number' ? error.code : 400).send({ message });
}

function getRouteRequestFromRequest(request: Request & { context?: Record<string, unknown> }): RouteRequest {
  addRequestContext(request);
  return {
    query: request.query,
    params: request.params,
    headers: request.headers,
    body: request.body,
    context: request.context,
  };
}

export function createMiddlewareHandler(ClassMiddlewares: Array<new () => Middleware>): Array<RequestHandler> {
  return ClassMiddlewares.map((ClassMiddleware) => {
    const controllerClassMiddleware = middlewareContainer.get<Middleware>(ClassMiddleware);
    return (request: Request, response: Response, next: NextFunction): void => {
      try {
        controllerClassMiddleware.requestHandler(getRouteRequestFromRequest(request))
          .then(next)
          .catch((error) => handleErrorResponse(response, error));
      } catch (error) {
        handleErrorResponse(response, error);
      }
    };
  });
}

declare type RequestPropertyDescriptor = TypedPropertyDescriptor<(params?: RouteRequest) => Promise<RouteResponse>>;

function createRequestHandler(
  target_: Controller & { routes?: Array<RouteType & { middlewareClass?: Array<new () => Middleware> }> },
  requestMethod: 'get' | 'put' | 'delete' | 'post',
  path: string,
  classMethod: string,
  routeConfig: RouteConfig,
  propertyDescriptor: RequestPropertyDescriptor): RequestPropertyDescriptor {
  const target = target_;
  const handlerMethod = `${ExpressFunctionPrefix}${classMethod}`;
  if (!target.routes) {
    target.routes = [];
  }
  target.routes.push({
    path,
    method: requestMethod,
    classMethod: handlerMethod,
    middleware: [],
    middlewareClass: routeConfig?.middleware || [],
  });
  Object.assign(target, {
    [handlerMethod](request: Request, response: Response): void {
      try {
        this[classMethod](getRouteRequestFromRequest(request))
          .then((result: RouteResponse) => response.status(result.code || 200).json(result.response))
          .catch((error) => handleErrorResponse(response, error));
      } catch (error) {
        handleErrorResponse(response, error);
      }
    },
  });
  return propertyDescriptor;
}

function GET(path: string, routeConfig: RouteConfig = {}): (...args: Array<unknown>) => RequestPropertyDescriptor {
  return function decorator(
    target: Controller & { routes?: Array<RouteType> },
    classMethod: string,
    propertyDescriptor: RequestPropertyDescriptor): RequestPropertyDescriptor {
    return createRequestHandler(target, 'get', path, classMethod, routeConfig, propertyDescriptor);
  };
}

function POST(path: string, routeConfig: RouteConfig = {}): (...args: Array<unknown>) => RequestPropertyDescriptor {
  return function decorator(
    target: Controller & { routes?: Array<RouteType> },
    classMethod_: string,
    propertyDescriptor: RequestPropertyDescriptor): RequestPropertyDescriptor {
    return createRequestHandler(target, 'post', path, classMethod_, routeConfig, propertyDescriptor);
  };
}

function PUT(path: string, routeConfig: RouteConfig = {}): (...args: Array<unknown>) => RequestPropertyDescriptor {
  return function decorator(
    target: Controller & { routes?: Array<RouteType> },
    classMethod_: string,
    propertyDescriptor: RequestPropertyDescriptor): RequestPropertyDescriptor {
    return createRequestHandler(target, 'put', path, classMethod_, routeConfig, propertyDescriptor);
  };
}

function DELETE(path: string, routeConfig: RouteConfig = {}): (...args: Array<unknown>) => RequestPropertyDescriptor {
  return function decorator(
    target: Controller & { routes?: Array<RouteType> },
    classMethod_: string,
    propertyDescriptor: RequestPropertyDescriptor): RequestPropertyDescriptor {
    return createRequestHandler(target, 'delete', path, classMethod_, routeConfig, propertyDescriptor);
  };
}

export { GET, POST, PUT, DELETE };
