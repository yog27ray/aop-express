/// <reference types="node" />
import { IncomingHttpHeaders } from 'http';
import { Request } from 'express';
import { AOPMiddleware } from '../declarations';
interface ParsedQs {
    [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}
export declare type API_REQUEST = {
    query: ParsedQs;
    params: {
        [key: string]: string;
    };
    headers: IncomingHttpHeaders;
    middlewareData: unknown;
    body?: unknown;
};
export declare type MiddlewareRequest = Request & {
    middlewareData?: {
        [key: string]: unknown;
    };
};
export declare type RouteConfig = {
    middleware?: Array<new () => AOPMiddleware>;
};
export declare type ServiceResponseType = {
    code?: number;
    response: {
        [key: string]: unknown;
    };
};
export {};
