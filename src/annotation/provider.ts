import { Provider } from '../declarations';
import { loadInContainer, providerContainer } from '../declarations/inversify';

export function provider<T extends Provider>(): (Target: new () => T) => void {
  return function decorator(Target: new () => T): void {
    loadInContainer(providerContainer, Target);
  };
}
