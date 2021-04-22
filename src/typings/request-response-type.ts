import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';
import { AOPMiddleware } from '../declarations';

interface ParsedQs { [key: string]: undefined | string | Array<string> | ParsedQs | Array<ParsedQs>; }

export declare interface AOPRequest {
  query: ParsedQs;
  params: { [key: string]: string };
  headers: IncomingHttpHeaders;
  middlewareData: unknown;
  body?: unknown;
}

export declare type MiddlewareRequest = Request & { middlewareData?: { [key: string]: unknown } };

export declare interface RouteConfig { middleware?: Array<new () => AOPMiddleware>; }

export declare interface AOPResponse { code?: number; response: { [key: string]: unknown } | Array<{ [key: string]: unknown; }>; }
