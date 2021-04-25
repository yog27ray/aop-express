import { injectable } from 'inversify';
import { RouteRequest } from '../typings/request-response-type';
import { Base } from './base';
import { providerContainer, serviceContainer } from './inversify';
import { Service } from './service';

@injectable()
export abstract class Middleware extends Base {
  protected getService<T extends Service>(table: new () => T): T {
    return serviceContainer.get(table);
  }

  protected getProvider<T>(table: new () => T): T {
    return providerContainer.get(table);
  }

  abstract requestHandler(request: RouteRequest): Promise<void>;
}
