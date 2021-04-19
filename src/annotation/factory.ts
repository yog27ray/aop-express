import { injectable } from 'inversify';
import { factoryContainer } from '../declarations/inversify';

export function Factory() {
  return function decorator(target: new () => unknown): void {
    injectable()(target);
    factoryContainer.bind(target).to(target).inSingletonScope();
  };
}
