import { Controller, controller, PUT, RouteResponse } from '../../../../src';
import { FirstMiddleware } from '../../../middleware/first.middleware';
import { SecondMiddleware } from '../../../middleware/second.middleware';
import { SubModuleTwoService } from './sub-module-two.service';

@controller({ middleware: [SecondMiddleware] })
export class SubModuleTwoController extends Controller<SubModuleTwoService> {
  constructor() {
    super();
    console.log('>>>>>>ServiceFunctionCall', this.service.testMethodCall());
  }

  @PUT('/', { middleware: [FirstMiddleware, SecondMiddleware] })
  testPutMethod(): Promise<RouteResponse> {
    this.service.testMethodCall();
    return Promise.resolve({ response: {} });
  }
}
