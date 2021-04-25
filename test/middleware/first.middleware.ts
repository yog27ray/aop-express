import { Middleware, middleware, MiddlewareRequest } from '../../src';

@middleware()
export class FirstMiddleware extends Middleware {
  requestHandler(request: MiddlewareRequest): Promise<void> {
    return Promise.resolve(undefined);
  }
}
