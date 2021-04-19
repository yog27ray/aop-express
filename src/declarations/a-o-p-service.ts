import { injectable, interfaces } from 'inversify';
import { Base } from './base';
import { factoryContainer, modelContainer, serviceContainer } from './inversify';
import { AOPModel } from './a-o-p-model';
import Abstract = interfaces.Abstract;

@injectable()
abstract class AOPService extends Base {
  protected getFactory<T>(table: Abstract<T> | (new () => T)): T {
    return factoryContainer.get(table);
  }

  protected getService<T extends AOPService>(table: new () => T): T {
    return serviceContainer.get(table);
  }
}

export { AOPService };
