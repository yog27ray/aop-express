import { Middleware, middleware } from '../../src';

@middleware()
export class PromiseErrorMiddleware extends Middleware {
  requestHandler(): Promise<void> {
    return Promise.reject(Error('this is promise error'));
  }
}
