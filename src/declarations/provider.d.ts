import { Base } from './base';
export declare class Provider extends Base {
    protected getProvider<T>(table: new () => T): T;
}
