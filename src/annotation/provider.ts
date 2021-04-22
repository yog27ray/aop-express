import { loadInContainer, providerContainer } from '../declarations/inversify';

export function Provider(): (Target: new () => unknown) => void {
  return function decorator(Target: new () => unknown): void {
    loadInContainer(providerContainer, Target);
  };
}
