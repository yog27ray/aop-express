import { Base } from './base';
import { AOPService } from './a-o-p-service';
import { MiddlewareRequest } from '../typings/request-response-type';
export declare abstract class AOPMiddleware extends Base {
    getFactory<T>(table: new () => T): T;
    getService<T extends AOPService>(table: new () => T): T;
    abstract requestHandler(request: MiddlewareRequest): Promise<void>;
}
