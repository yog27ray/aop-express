import { Base } from './base';
import { factoryContainer } from './inversify';

export class AOPModule extends Base {
  protected getFactory<T>(table: new () => T): T {
    return factoryContainer.get(table);
  }
}
