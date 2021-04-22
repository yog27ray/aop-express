import { Base } from './base';
import { providerContainer } from './inversify';

export class AOPProvider extends Base {
  protected getProvider<T>(table: new () => T): T {
    return providerContainer.get(table);
  }
}
