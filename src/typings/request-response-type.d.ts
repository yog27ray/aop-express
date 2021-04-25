/// <reference types="node" />
import { IncomingHttpHeaders } from 'http';
import { Middleware } from '../declarations';
interface ParsedQs {
    [key: string]: undefined | string | Array<string> | ParsedQs | Array<ParsedQs>;
}
export declare interface RouteRequest {
    query: ParsedQs;
    params: Record<string, string>;
    headers: IncomingHttpHeaders;
    context: Record<string, unknown>;
    body?: unknown;
}
export declare interface RouteConfig {
    middleware?: Array<new () => Middleware>;
}
export declare interface RouteResponse {
    code?: number;
    response: {
        [key: string]: unknown;
    } | Array<{
        [key: string]: unknown;
    }>;
}
export {};
