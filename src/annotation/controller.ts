import { Controller, Service } from '../declarations';
import { setConfig } from '../declarations/class-config';
import { ControllerConfig } from '../typings/config';

export function controller<
  X extends new() => unknown,
  Y extends Service<X>,
  Z extends Controller<Y>
  >(config: ControllerConfig = {}): (Target: new () => Z) => void {
  return function decorator(Target: new () => Z): void {
    Object.assign(Target, { aopId: setConfig(config) });
  };
}
