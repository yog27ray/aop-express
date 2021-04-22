import { Base } from './base';
declare abstract class AOPService<Z extends new () => unknown = new () => unknown> extends Base {
    private readonly _model;
    constructor();
    protected getService<T extends AOPService>(table: new () => T): T;
    protected getProvider<T>(table: new () => T): T;
    protected get Model(): Z;
}
export { AOPService };
