import { AOPService } from './a-o-p-service';
import { Base } from './base';
export declare class AOPController<T extends AOPService = undefined> extends Base {
    private readonly _service;
    constructor();
    protected get service(): T;
}
