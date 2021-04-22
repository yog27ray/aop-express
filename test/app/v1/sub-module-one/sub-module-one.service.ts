import { AOPService, Service } from '../../../../src';
import { CustomOneProvider } from '../../../provider/custom-one.provider';

@Service()
export class SubModuleOneService extends AOPService {
  customOneProvider: CustomOneProvider = this.getProvider(CustomOneProvider);

  constructor() {
    super();
    console.log('>>>>>>ProviderFunctionCall', this.customOneProvider.testMethodCall());
  }
}
