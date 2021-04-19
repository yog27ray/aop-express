import { injectable } from 'inversify';
import { Base } from './base';
import { AOPService } from './a-o-p-service';
import { factoryContainer, serviceContainer } from './inversify';
import { MiddlewareRequest } from '../typings/request-response-type';

@injectable()
export abstract class AOPMiddleware extends Base {
  getFactory<T>(table: new () => T): T {
    return factoryContainer.get(table);
  }

  getService<T extends AOPService>(table: new () => T): T {
    return serviceContainer.get(table);
  }

  abstract requestHandler(request: MiddlewareRequest): Promise<void>;
}
