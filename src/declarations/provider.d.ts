import { Base } from './base';
import { Factory } from './factory';
export declare class Provider extends Base {
    protected getFactory<T extends Factory>(table: new () => T): T;
    protected getProvider<T>(table: new () => T): T;
}
