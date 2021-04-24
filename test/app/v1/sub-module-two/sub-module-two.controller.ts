import { AOPController, AOPResponse, Controller, PUT } from '../../../../src';
import { FirstMiddleware } from '../../../middleware/first.middleware';
import { SecondMiddleware } from '../../../middleware/second.middleware';
import { SubModuleTwoService } from './sub-module-two.service';

@Controller({ middleware: [SecondMiddleware] })
export class SubModuleTwoController extends AOPController<SubModuleTwoService> {
  constructor() {
    super();
    console.log('>>>>>>ServiceFunctionCall', this.service.testMethodCall());
  }

  @PUT('/', { middleware: [FirstMiddleware, SecondMiddleware] })
  testPutMethod(): Promise<AOPResponse> {
    this.service.testMethodCall();
    return Promise.resolve({ response: {} });
  }
}
