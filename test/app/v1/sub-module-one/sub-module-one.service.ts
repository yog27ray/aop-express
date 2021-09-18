import { Service, service } from '../../../../src';
import { CustomOneProvider } from '../../../provider/custom-one.provider';
import { MainService } from '../../main.service';

@service()
export class SubModuleOneService extends Service {
  mainService: MainService = this.getService(MainService);
  customOneProvider: CustomOneProvider = this.getProvider(CustomOneProvider);

  providerCall(): string {
    return `SubModuleOneServiceMethodCall|${this.mainService.testMethod()}|${this.customOneProvider.testMethodCall()}`;
  }
}
