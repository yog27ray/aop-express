import { AOPService } from '../declarations';
import { ServiceType } from '../typings/annotation';

export function Service(config: ServiceType = {}) {
  return function decorator(Target: new () => AOPService): void {
    Object.assign(Target, { config: { ...config } });
  };
}
