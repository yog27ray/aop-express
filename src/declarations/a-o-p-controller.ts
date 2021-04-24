import { injectable } from 'inversify';
import { ModuleConfig } from '../typings/config';
import { AOPService } from './a-o-p-service';
import { Base } from './base';
import { getConfig } from './class-config';
import { serviceContainer } from './inversify';

@injectable()
export class AOPController<T extends AOPService = AOPService> extends Base {
  private readonly _service: T;
  constructor() {
    super();
    const moduleConfig = getConfig((this.constructor as { aopId?: string }).aopId) as ModuleConfig;
    if (moduleConfig.service) {
      this._service = serviceContainer.get(moduleConfig.service);
    }
  }

  protected get service(): T {
    return this._service;
  }
}
