import { Container, injectable } from 'inversify';
import { Base } from './base';
import { getConfig } from './class-config';
import { providerContainer } from './inversify';

@injectable()
abstract class Service extends Base {
  protected getService<T extends Service>(table: new () => T): T {
    return (getConfig((this.constructor as { aopId?: string }).aopId) as { container?: Container }).container.get(table);
  }

  protected getProvider<T>(table: new () => T): T {
    return providerContainer.get(table);
  }
}

export { Service };
