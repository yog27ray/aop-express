import { MiddlewareRequest } from '../typings/request-response-type';
import { Base } from './base';
import { Service } from './service';
export declare abstract class Middleware extends Base {
    protected getService<T extends Service>(table: new () => T): T;
    protected getProvider<T>(table: new () => T): T;
    abstract requestHandler(request: MiddlewareRequest): Promise<void>;
}
