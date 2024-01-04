/* eslint-disable no-console */
import { Service, service } from '../../../../src';
import { MainService } from '../../main.service';
import { SubModuleTwoModel } from './sub-module-two.model';

@service()
export class SubModuleTwoService extends Service<typeof SubModuleTwoModel> {
  mainService: MainService = this.getService(MainService);

  testMethodCall(): string {
    console.log('>>>>>>MainServiceCallFromSubModuleTwo', this.mainService.testMethod());
    console.log('>>>>>>ModelTestFunctionCall', this.Model.testModelCall());
    return 'success';
  }
}
