import { Middleware, middleware, RouteRequest } from '../../src';

@middleware()
export class FirstMiddleware extends Middleware {
  requestHandler(request: RouteRequest): Promise<void> {
    request.context.firstMiddleware = 'true';
    return Promise.resolve();
  }
}
