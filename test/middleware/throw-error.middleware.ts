import { Middleware, middleware } from '../../src';

@middleware()
export class ThrowErrorMiddleware extends Middleware {
  requestHandler(): Promise<void> {
    throw Error('This is error throw');
  }
}
