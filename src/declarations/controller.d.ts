import { Service } from './service';
import { Base } from './base';
export declare class Controller<T extends Service = Service> extends Base {
    private readonly _service;
    constructor();
    protected get service(): T;
}
