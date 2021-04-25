import { Base } from './base';
declare abstract class Service<Z extends new () => unknown = new () => unknown> extends Base {
    private readonly _model;
    constructor();
    protected getService<T extends Service>(table: new () => T): T;
    protected getProvider<T>(table: new () => T): T;
    protected get Model(): Z;
}
export { Service };
