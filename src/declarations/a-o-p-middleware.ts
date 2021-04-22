import { injectable } from 'inversify';
import { MiddlewareRequest } from '../typings/request-response-type';
import { AOPService } from './a-o-p-service';
import { Base } from './base';
import { providerContainer, serviceContainer } from './inversify';

@injectable()
export abstract class AOPMiddleware extends Base {
  protected getService<T extends AOPService>(table: new () => T): T {
    return serviceContainer.get(table);
  }

  protected getProvider<T>(table: new () => T): T {
    return providerContainer.get(table);
  }

  abstract requestHandler(request: MiddlewareRequest): Promise<void>;
}
