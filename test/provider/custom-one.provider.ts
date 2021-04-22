import { AOPProvider, Provider } from '../../src';

@Provider()
export class CustomOneProvider extends AOPProvider {
  testMethodCall(): string {
    return 'success';
  }
}
