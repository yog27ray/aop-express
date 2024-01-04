import { Middleware, middleware, MiddlewareRequest } from '../../src';

@middleware()
export class FirstMiddleware extends Middleware {
  async requestHandler(request: MiddlewareRequest): Promise<void> {
    await Promise.resolve(request);
  }
}
