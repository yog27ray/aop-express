import { MiddlewareRequest } from '../typings/request-response-type';
import { AOPService } from './a-o-p-service';
import { Base } from './base';
export declare abstract class AOPMiddleware extends Base {
    protected getFactory<T>(table: new () => T): T;
    protected getService<T extends AOPService>(table: new () => T): T;
    abstract requestHandler(request: MiddlewareRequest): Promise<void>;
}
