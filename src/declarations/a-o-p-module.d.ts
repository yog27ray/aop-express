import { Base } from './base';
export declare class AOPModule extends Base {
    getFactory<T>(table: new () => T): T;
}
