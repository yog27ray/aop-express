import { Base } from './base';
export declare class AOPProvider extends Base {
    protected getProvider<T>(table: new () => T): T;
}
