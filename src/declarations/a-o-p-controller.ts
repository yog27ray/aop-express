import { injectable } from 'inversify';
import { RequestHandler } from 'express';
import { Base } from './base';
import { factoryContainer, serviceContainer } from './inversify';
import { AOPService } from './a-o-p-service';

export declare interface RouteType {
  classMethod?: string;
  middleware?: Array<RequestHandler>;
  method?: string;
  path: string;
}

@injectable()
export class AOPController extends Base {
  getFactory<T>(table: new () => T): T {
    return factoryContainer.get(table);
  }

  getService<T extends AOPService>(table: new () => T): T {
    return serviceContainer.get(table);
  }
}
