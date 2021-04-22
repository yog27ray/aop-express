import { AOPService } from './a-o-p-service';
import { Base } from './base';
export declare class AOPController<T extends AOPService = AOPService> extends Base {
    private readonly _service;
    constructor();
    protected get service(): T;
}
