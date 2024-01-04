import { Base } from './base';
import { providerContainer } from './inversify';

export class Provider extends Base {
  protected getProvider<T>(table: new () => T): T {
    return providerContainer.get(table) as T;
  }
}
