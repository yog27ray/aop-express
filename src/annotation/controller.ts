import { AOPController, AOPService } from '../declarations';
import { ControllerType } from '../typings/annotation';

export function Controller<
  X extends new() => unknown,
  Y extends AOPService<X>,
  Z extends AOPController<Y>
  >(config: ControllerType = {}): (Target: new () => Z) => void {
  return function decorator(Target: new () => Z): void {
    Object.assign(Target, { config: { ...config } });
  };
}
