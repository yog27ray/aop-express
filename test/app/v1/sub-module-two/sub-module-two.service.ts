import { AOPService, Service } from '../../../../src';
import { SubModuleTwoModel } from './sub-module-two.model';

@Service()
export class SubModuleTwoService extends AOPService<typeof SubModuleTwoModel> {
  testMethodCall(): string {
    console.log('>>>>>>ModelTestFunctionCall', this.Model.testModelCall());
    return 'success';
  }
}
