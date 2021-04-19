import { RequestHandler } from 'express';
import { AOPController, AOPMiddleware } from '../declarations';
import { RouteType } from '../declarations/a-o-p-controller';
import { AOPRequest, RouteConfig, AOPResponseType } from '../typings/request-response-type';
export declare function createMiddlewareHandler(ClassMiddlewares: Array<new () => AOPMiddleware>): Array<RequestHandler>;
declare type RequestPropertyDescriptor = TypedPropertyDescriptor<(params?: AOPRequest) => Promise<AOPResponseType>>;
declare function GET(path: string, routeConfig?: RouteConfig): (target: AOPController & {
    routes?: Array<RouteType>;
}, classMethod: string, propertyDescriptor: RequestPropertyDescriptor) => RequestPropertyDescriptor;
declare function POST(path: string, routeConfig?: RouteConfig): (target: AOPController & {
    routes?: Array<RouteType>;
}, classMethod_: string, propertyDescriptor: RequestPropertyDescriptor) => RequestPropertyDescriptor;
declare function PUT(path: string, routeConfig?: RouteConfig): (target: AOPController & {
    routes?: Array<RouteType>;
}, classMethod_: string, propertyDescriptor: RequestPropertyDescriptor) => RequestPropertyDescriptor;
declare function DELETE(path: string, routeConfig?: RouteConfig): (target: AOPController & {
    routes?: Array<RouteType>;
}, classMethod_: string, propertyDescriptor: RequestPropertyDescriptor) => RequestPropertyDescriptor;
export { GET, POST, PUT, DELETE };
