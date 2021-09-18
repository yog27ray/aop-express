import { Controller, controller, PUT, RouteRequest, RouteResponse } from '../../../../src';
import { FirstMiddleware } from '../../../middleware/first.middleware';
import { SecondMiddleware } from '../../../middleware/second.middleware';
import { SubModuleTwoService } from './sub-module-two.service';

@controller({ middleware: [SecondMiddleware] })
export class SubModuleTwoController extends Controller<SubModuleTwoService> {
  @PUT('/', { middleware: [FirstMiddleware, SecondMiddleware] })
  testPutMethod({ context }: RouteRequest): Promise<RouteResponse> {
    const methodCallResponse = this.service.testMethodCall();
    return Promise.resolve({ response: { methodCallResponse, context } });
  }
}
