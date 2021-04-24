import { RequestHandler } from 'express';
import { AOPMiddleware } from '../declarations';
import { AOPRequest, AOPResponse, RouteConfig } from '../typings/request-response-type';
export declare function createMiddlewareHandler(ClassMiddlewares: Array<new () => AOPMiddleware>): Array<RequestHandler>;
declare type RequestPropertyDescriptor = TypedPropertyDescriptor<(params?: AOPRequest) => Promise<AOPResponse>>;
declare function GET(path: string, routeConfig?: RouteConfig): (...args: Array<unknown>) => RequestPropertyDescriptor;
declare function POST(path: string, routeConfig?: RouteConfig): (...args: Array<unknown>) => RequestPropertyDescriptor;
declare function PUT(path: string, routeConfig?: RouteConfig): (...args: Array<unknown>) => RequestPropertyDescriptor;
declare function DELETE(path: string, routeConfig?: RouteConfig): (...args: Array<unknown>) => RequestPropertyDescriptor;
export { GET, POST, PUT, DELETE };