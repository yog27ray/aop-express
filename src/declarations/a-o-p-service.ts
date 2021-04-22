import { injectable } from 'inversify';
import { Base } from './base';
import { modelContainer, providerContainer, serviceContainer } from './inversify';

@injectable()
abstract class AOPService<Z extends new () => unknown = new () => unknown> extends Base {
  private readonly _model: Z;

  constructor() {
    super();
    const ConstructorClass: any = this.constructor;
    if (ConstructorClass.config?.model) {
      this._model = modelContainer.get(ConstructorClass.config?.model);
    }
  }

  protected getService<T extends AOPService>(table: new () => T): T {
    return serviceContainer.get(table);
  }

  protected getProvider<T>(table: new () => T): T {
    return providerContainer.get(table);
  }

  protected get Model(): Z {
    return this._model;
  }
}

export { AOPService };
