import { Service, service } from '../../../../src';
import { CustomOneProvider } from '../../../provider/custom-one.provider';
import { MainService } from '../../main.service';

@service()
export class SubModuleOneService extends Service {
  mainService: MainService = this.getService(MainService);
  customOneProvider: CustomOneProvider = this.getProvider(CustomOneProvider);

  constructor() {
    super();
    console.log('>>>>>>MainServiceCallFromSubModuleOne', this.mainService.testMethod());
    console.log('>>>>>>ProviderFunctionCall', this.customOneProvider.testMethodCall());
  }
}
