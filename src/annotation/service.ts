import { AOPService } from '../declarations';
import { setConfig } from '../declarations/class-config';
import { ServiceConfig } from '../typings/config';

export function Service(config: ServiceConfig = {}): (Target: new () => AOPService) => void {
  return function decorator(Target: new () => AOPService): void {
    Object.assign(Target, { aopId: setConfig(config) });
  };
}
