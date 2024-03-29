import { NextFunction, RequestHandler, Response } from 'express';
import { Controller, Middleware } from '../declarations';
import { middlewareContainer } from '../declarations/inversify';
import { AOPRequest, AOPResponse, MiddlewareRequest, RouteConfig } from '../typings/request-response-type';
import { RouteType } from '../typings/route';

const ExpressFunctionPrefix: string = 'express_';

function addMiddlewareData(request: MiddlewareRequest): void {
  if (!request.middlewareData) {
    request.middlewareData = {};
  }
}

function handleErrorResponse(response: Response, error: Error & { code?: number }): void {
  const { message } = error;
  response.status(typeof error.code === 'number' ? error.code : 400).send({ message });
}

export function createMiddlewareHandler(ClassMiddlewares: Array<new () => Middleware>): Array<RequestHandler> {
  return ClassMiddlewares.map((ClassMiddleware) => {
    const controllerClassMiddleware = middlewareContainer.get<Middleware>(ClassMiddleware);
    return (request: MiddlewareRequest, response: Response, next: NextFunction): void => {
      addMiddlewareData(request);
      controllerClassMiddleware.requestHandler(request)
        .then(next)
        .catch((error) => handleErrorResponse(response, error as Error));
    };
  });
}

declare type RequestPropertyDescriptor = TypedPropertyDescriptor<(params?: AOPRequest) => Promise<AOPResponse>>;

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
    [handlerMethod](request: MiddlewareRequest, response: Response): void {
      addMiddlewareData(request);
      this[classMethod]({
        middlewareData: request.middlewareData,
        query: request.query,
        params: request.params,
        headers: request.headers,
        body: request.body,
      })
        .then((result: AOPResponse) => response.status(result.code || 200).json(result.response))
        .catch((error) => handleErrorResponse(response, error as Error));
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
