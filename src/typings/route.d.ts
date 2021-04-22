import { RequestHandler } from 'express';
export declare interface RouteType {
    classMethod?: string;
    middleware?: Array<RequestHandler>;
    method?: string;
    path: string;
}
