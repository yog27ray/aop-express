import { Service, service } from '../../../../src';
import { MainService } from '../../main.service';

@service()
export class SubModuleTwoService extends Service {
  mainService: MainService = this.getService(MainService);

  testMethodCall(): string {
    return `SubModuleTwoServiceMethodCall:${this.mainService.testMethod()}`;
  }
}
