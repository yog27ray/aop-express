import { Service, service } from '../../src';

@service()
export class MainService extends Service {
  testMethod(): string {
    return 'success';
  }
}
