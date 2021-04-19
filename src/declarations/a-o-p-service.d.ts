import { interfaces } from 'inversify';
import { Base } from './base';
import Abstract = interfaces.Abstract;
declare abstract class AOPService extends Base {
    protected getFactory<T>(table: Abstract<T> | (new () => T)): T;
    protected getService<T extends AOPService>(table: new () => T): T;
}
export { AOPService };
