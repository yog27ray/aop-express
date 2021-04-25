import { Middleware, middleware, RouteRequest } from '../../src';

@middleware()
export class SecondMiddleware extends Middleware {
  requestHandler(request: RouteRequest): Promise<void> {
    return Promise.resolve(undefined);
  }
}
