import { Base } from './base';
import { Service } from './service';
export declare class Controller<T extends Service = Service> extends Base {
    private readonly _service;
    constructor();
    protected get service(): T;
}
