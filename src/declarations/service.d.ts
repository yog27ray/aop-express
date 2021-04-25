import { Base } from './base';
import { Factory } from './factory';
declare abstract class Service<Z extends new () => unknown = new () => unknown> extends Base {
    private readonly _model;
    constructor();
    protected getFactory<T extends Factory>(table: new () => T): T;
    protected getService<T extends Service>(table: new () => T): T;
    protected getProvider<T>(table: new () => T): T;
    protected get Model(): Z;
}
export { Service };
