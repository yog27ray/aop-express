import { AOPProvider } from '../declarations';
import { loadInContainer, providerContainer } from '../declarations/inversify';

export function Provider<T extends AOPProvider>(): (Target: new () => T) => void {
  return function decorator(Target: new () => T): void {
    loadInContainer(providerContainer, Target);
  };
}
