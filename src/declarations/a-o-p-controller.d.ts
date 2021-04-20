import { RequestHandler } from 'express';
import { Base } from './base';
import { AOPService } from './a-o-p-service';
export declare interface RouteType {
    classMethod?: string;
    middleware?: Array<RequestHandler>;
    method?: string;
    path: string;
}
export declare class AOPController extends Base {
    protected getFactory<T>(table: new () => T): T;
    protected getService<T extends AOPService>(table: new () => T): T;
}
