import { AOPController } from '../declarations';
import { ControllerType } from '../typings/annotation';

export function aopController<T extends AOPController>(config: ControllerType = {}) {
  return function decorator(Target: new () => T): void {
    Object.assign(Target, { config: { ...config } });
  };
}
