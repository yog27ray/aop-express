import { injectable } from 'inversify';
import { AOPMiddleware } from '../declarations';
import { middlewareContainer } from '../declarations/inversify';

export function Middleware(): (target: new () => AOPMiddleware) => void {
  return function decorator(target: new () => AOPMiddleware): void {
    injectable()(target);
    middlewareContainer.bind(target).to(target).inSingletonScope();
  };
}
