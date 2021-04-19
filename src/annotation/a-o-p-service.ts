import { AOPService } from '../declarations';
import { ServiceType } from '../typings/annotation';

export function aopService(config: ServiceType = {}) {
  return function decorator(Target: new () => AOPService): void {
    Object.assign(Target, { config: { ...config } });
  };
}
