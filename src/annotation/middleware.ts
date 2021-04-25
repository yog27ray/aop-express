import { injectable } from 'inversify';
import { Middleware } from '../declarations';
import { middlewareContainer } from '../declarations/inversify';

export function middleware(): (target: new () => Middleware) => void {
  return function decorator(target: new () => Middleware): void {
    injectable()(target);
    middlewareContainer.bind(target).to(target).inSingletonScope();
  };
}
