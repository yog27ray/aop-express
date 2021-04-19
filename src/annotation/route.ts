import { NextFunction, RequestHandler, Response } from 'express';
import { AOPController, AOPMiddleware } from '../declarations';
import { RouteType } from '../declarations/a-o-p-controller';
import { API_REQUEST, MiddlewareRequest, RouteConfig, ServiceResponseType } from '../typings/request-response-type';
import { middlewareContainer } from '../declarations/inversify';

const ExpressFunctionPrefix: string = 'express_';

function addMiddlewareData(request: MiddlewareRequest): void {
  if (!request.middlewareData) {
    request.middlewareData = {};
  }
}

function handleErrorResponse(response: Response, error: Error & { code?: number }): void {
  const { message } = error;
  response.status(error.code || 400).send({ message });
}

export function createMiddlewareHandler(ClassMiddlewares: Array<new () => AOPMiddleware>): Array<RequestHandler> {
  return ClassMiddlewares.map((ClassMiddleware) => {
    const controllerClassMiddleware = middlewareContainer.get<AOPMiddleware>(ClassMiddleware);
    return async (request: MiddlewareRequest, response: Response, next: NextFunction): Promise<void> => {
      try {
        addMiddlewareData(request);
        await controllerClassMiddleware.requestHandler(request);
        next();
      } catch (error) {
        handleErrorResponse(response, error);
      }
    };
  });
}

declare type RequestPropertyDescriptor = TypedPropertyDescriptor<(params?: API_REQUEST) => Promise<ServiceResponseType>>;

function createRequestHandler(
  target_: AOPController & { routes?: Array<RouteType & { middlewareClass?: Array<new () => AOPMiddleware> }> },
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
    async [handlerMethod](request: MiddlewareRequest, response: Response) {
      try {
        addMiddlewareData(request);
        const result = await this[classMethod]({
          middlewareData: request.middlewareData,
          query: request.query,
          params: request.params,
          headers: request.headers,
          body: request.body,
        });
        response.status(result.code || 200).json(result.response);
      } catch (error) {
        handleErrorResponse(response, error);
      }
    },
  });
  return propertyDescriptor;
}

function GET(path: string, routeConfig: RouteConfig = {}) {
  return function decorator(
    target: AOPController & { routes?: Array<RouteType> },
    classMethod: string,
    propertyDescriptor: RequestPropertyDescriptor): RequestPropertyDescriptor {
    return createRequestHandler(target, 'get', path, classMethod, routeConfig, propertyDescriptor);
  };
}

function POST(path: string, routeConfig: RouteConfig = {}) {
  return function decorator(
    target: AOPController & { routes?: Array<RouteType> },
    classMethod_: string,
    propertyDescriptor: RequestPropertyDescriptor): RequestPropertyDescriptor {
    return createRequestHandler(target, 'post', path, classMethod_, routeConfig, propertyDescriptor);
  };
}

function PUT(path: string, routeConfig: RouteConfig = {}) {
  return function decorator(
    target: AOPController & { routes?: Array<RouteType> },
    classMethod_: string,
    propertyDescriptor: RequestPropertyDescriptor): RequestPropertyDescriptor {
    return createRequestHandler(target, 'put', path, classMethod_, routeConfig, propertyDescriptor);
  };
}

function DELETE(path: string, routeConfig: RouteConfig = {}) {
  return function decorator(
    target: AOPController & { routes?: Array<RouteType> },
    classMethod_: string,
    propertyDescriptor: RequestPropertyDescriptor): RequestPropertyDescriptor {
    return createRequestHandler(target, 'delete', path, classMethod_, routeConfig, propertyDescriptor);
  };
}

export { GET, POST, PUT, DELETE };
