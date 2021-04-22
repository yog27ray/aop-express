import { AOPController, AOPResponse, Controller, PUT } from '../../../../src';
import { SubModuleTwoService } from './sub-module-two.service';

@Controller()
export class SubModuleTwoController extends AOPController<SubModuleTwoService> {
  constructor() {
    super();
    console.log('>>>>>>ServiceFunctionCall', this.service.testMethodCall());
  }

  @PUT('/')
  testPutMethod(): Promise<AOPResponse> {
    this.service.testMethodCall();
    return Promise.resolve({ response: {} });
  }
}
