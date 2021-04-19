import { injectable } from 'inversify';
import { factoryContainer } from '../declarations/inversify';

interface Abstract { prototype: unknown; }

export function aopFactory() {
  return function decorator(target: new () => unknown): void {
    injectable()(target);
    factoryContainer.bind(target).to(target).inSingletonScope();
  };
}

export function aopFactoryConstant(bind: Abstract) {
  return function decorator(target: unknown): void {
    factoryContainer.bind(bind).toConstantValue(target);
  };
}
