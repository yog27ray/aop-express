import { AOPMiddleware, Middleware, MiddlewareRequest } from '../../src';

@Middleware()
export class SecondMiddleware extends AOPMiddleware {
  requestHandler(request: MiddlewareRequest): Promise<void> {
    return Promise.resolve(undefined);
  }
}
