import { AOPService, Service } from '../../src';

@Service()
export class MainService extends AOPService {
  testMethod(): string {
    return 'success';
  }
}
