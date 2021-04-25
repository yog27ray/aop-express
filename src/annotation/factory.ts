import { Factory } from '../declarations';
import { setConfig } from '../declarations/class-config';
import { factoryContainer, loadInContainer } from '../declarations/inversify';

export function factory<T extends Factory>(): (Target: new () => T) => void {
  return function decorator(Target: new () => T): void {
    Object.assign(Target, { aopId: setConfig({}) });
    loadInContainer(factoryContainer, Target);
  };
}
