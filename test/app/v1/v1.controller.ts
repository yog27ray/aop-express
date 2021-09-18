import { Controller, controller, GET, RouteResponse } from '../../../src';
import { PromiseErrorMiddleware } from '../../middleware/promise-error.middleware';
import { ThrowErrorMiddleware } from '../../middleware/throw-error.middleware';
import { DatabaseController } from './database/database.controller';
import { SubModuleOneController } from './sub-module-one/sub-module-one.controller';
import { SubModuleTwoController } from './sub-module-two/sub-module-two.controller';

@controller({
  routes: [
    { path: '/one', child: SubModuleOneController },
    { path: '/two', child: SubModuleTwoController },
    { path: '/database', child: DatabaseController },
  ],
})
export class V1Controller extends Controller {
  @GET('/errorThrow')
  errorThrow(): Promise<RouteResponse> {
    throw Error('This is throw route error');
  }

  @GET('/errorPromise')
  errorPromise(): Promise<RouteResponse> {
    return Promise.reject(Error('This is promise route error.'));
  }

  @GET('/errorPromiseMiddleWare', { middleware: [PromiseErrorMiddleware] })
  errorPromiseMiddleware(): Promise<RouteResponse> {
    return Promise.resolve({ response: {} });
  }

  @GET('/errorThrowMiddleWare', { middleware: [ThrowErrorMiddleware] })
  errorThrowMiddleware(): Promise<RouteResponse> {
    return Promise.resolve({ response: {} });
  }
}
