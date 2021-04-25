import { Container, injectable } from 'inversify';
import { Base } from './base';
import { getConfig } from './class-config';
import { Factory } from './factory';
import { factoryContainer, modelContainer, providerContainer } from './inversify';

@injectable()
abstract class Service<Z extends new () => unknown = new () => unknown> extends Base {
  private readonly _model: Z;

  constructor() {
    super();
    const serviceConfig = getConfig((this.constructor as { aopId?: string }).aopId) as { model: new () => unknown };
    if (serviceConfig?.model) {
      this._model = modelContainer.get(serviceConfig.model);
    }
  }

  protected getFactory<T extends Factory>(table: new () => T): T {
    return factoryContainer.get(table);
  }

  protected getService<T extends Service>(table: new () => T): T {
    return (getConfig((this.constructor as { aopId?: string }).aopId) as { container?: Container }).container.get(table);
  }

  protected getProvider<T>(table: new () => T): T {
    return providerContainer.get(table);
  }

  protected get Model(): Z {
    return this._model;
  }
}

export { Service };
