import { injectable } from 'inversify';
import { AOPService } from './a-o-p-service';
import { Base } from './base';
import { serviceContainer } from './inversify';

@injectable()
export class AOPController<T extends AOPService = undefined> extends Base {
  private readonly _service: T;
  constructor() {
    super();
    const ConstructorClass: any = this.constructor;
    if (ConstructorClass.config?.service) {
      this._service = serviceContainer.get(ConstructorClass.config?.service);
    }
  }

  protected get service(): T {
    return this._service;
  }
}
