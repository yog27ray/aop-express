import { AOPController, AOPService } from '../declarations';
import { setConfig } from '../declarations/class-config';
import { ControllerConfig } from '../typings/config';

export function Controller<
  X extends new() => unknown,
  Y extends AOPService<X>,
  Z extends AOPController<Y>
  >(config: ControllerConfig = {}): (Target: new () => Z) => void {
  return function decorator(Target: new () => Z): void {
    Object.assign(Target, { aopId: setConfig(config) });
  };
}
