import { AOPService, Provider } from '../../src';

@Provider()
export class CustomOneProvider extends AOPService {
  testMethodCall(): string {
    return 'success';
  }
}
