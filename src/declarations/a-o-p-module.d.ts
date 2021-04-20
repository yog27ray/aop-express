import { Base } from './base';
export declare class AOPModule extends Base {
    protected getFactory<T>(table: new () => T): T;
}
