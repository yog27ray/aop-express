import { Controller, controller, GET, RouteResponse } from '../../src';
import { MainService } from './main.service';
import { V1Controller } from './v1/v1.controller';

@controller({
  routes: [
    { path: '/v1', child: V1Controller },
  ],
})
export class MainController extends Controller<MainService> {
  @GET('/')
  getMainController(): Promise<RouteResponse> {
    return Promise.resolve({ response: {} });
  }
}
