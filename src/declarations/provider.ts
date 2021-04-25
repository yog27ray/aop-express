import { Base } from './base';
import { Factory } from './factory';
import { factoryContainer, providerContainer } from './inversify';

export class Provider extends Base {
  protected getFactory<T extends Factory>(table: new () => T): T {
    return factoryContainer.get(table);
  }

  protected getProvider<T>(table: new () => T): T {
    return providerContainer.get(table);
  }
}
