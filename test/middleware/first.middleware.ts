import { Middleware, middleware, RouteRequest } from '../../src';

@middleware()
export class FirstMiddleware extends Middleware {
  requestHandler(request: RouteRequest): Promise<void> {
    return Promise.resolve(undefined);
  }
}
