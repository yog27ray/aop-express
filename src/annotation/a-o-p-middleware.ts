import { injectable } from 'inversify';
import { middlewareContainer } from '../declarations/inversify';
import { AOPMiddleware } from '../declarations';

export function aopMiddleware() {
  return function decorator(target: new () => AOPMiddleware): void {
    injectable()(target);
    middlewareContainer.bind(target).to(target).inSingletonScope();
  };
}
