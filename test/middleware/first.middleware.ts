import { AOPMiddleware, Middleware, MiddlewareRequest } from '../../src';

@Middleware()
export class FirstMiddleware extends AOPMiddleware {
  requestHandler(request: MiddlewareRequest): Promise<void> {
    return Promise.resolve(undefined);
  }
}
