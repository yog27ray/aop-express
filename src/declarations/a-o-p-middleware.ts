import { injectable } from 'inversify';
import { MiddlewareRequest } from '../typings/request-response-type';
import { AOPService } from './a-o-p-service';
import { Base } from './base';
import { factoryContainer, serviceContainer } from './inversify';

@injectable()
export abstract class AOPMiddleware extends Base {
  protected getFactory<T>(table: new () => T): T {
    return factoryContainer.get(table);
  }

  protected getService<T extends AOPService>(table: new () => T): T {
    return serviceContainer.get(table);
  }

  abstract requestHandler(request: MiddlewareRequest): Promise<void>;
}
