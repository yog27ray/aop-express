import { AOPService, Service } from '../../../../src';
import { CustomOneProvider } from '../../../provider/custom-one.provider';
import { MainService } from '../../main.service';

@Service()
export class SubModuleOneService extends AOPService {
  mainService: MainService = this.getService(MainService);
  customOneProvider: CustomOneProvider = this.getProvider(CustomOneProvider);

  constructor() {
    super();
    console.log('>>>>>>MainServiceCallFromSubModuleOne', this.mainService.testMethod());
    console.log('>>>>>>ProviderFunctionCall', this.customOneProvider.testMethodCall());
  }
}
