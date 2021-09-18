import { Middleware, middleware, RouteRequest } from '../../src';

@middleware()
export class SecondMiddleware extends Middleware {
  requestHandler(request: RouteRequest): Promise<void> {
    request.context.secondMiddleware = 'true';
    return Promise.resolve();
  }
}
