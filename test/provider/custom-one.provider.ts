import { Provider, provider } from '../../src';

@provider()
export class CustomOneProvider extends Provider {
  testMethodCall(): string {
    return 'success';
  }
}
