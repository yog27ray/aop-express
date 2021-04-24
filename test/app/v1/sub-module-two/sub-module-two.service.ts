import { AOPService, Service } from '../../../../src';
import { MainService } from '../../main.service';
import { SubModuleTwoModel } from './sub-module-two.model';

@Service()
export class SubModuleTwoService extends AOPService<typeof SubModuleTwoModel> {
  mainService: MainService = this.getService(MainService);

  testMethodCall(): string {
    console.log('>>>>>>MainServiceCallFromSubModuleTwo', this.mainService.testMethod());
    console.log('>>>>>>ModelTestFunctionCall', this.Model.testModelCall());
    return 'success';
  }
}
