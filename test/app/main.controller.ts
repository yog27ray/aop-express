import { AOPResponse, Controller, controller, GET } from '../../src';
import { MainService } from './main.service';
import { V1Controller } from './v1/v1.controller';

@controller({
  routes: [
    { path: '/api', child: V1Controller },
  ],
})
export class MainController extends Controller<MainService> {
  @GET('/')
  getMainController(): Promise<AOPResponse> {
    return Promise.resolve({ response: {} });
  }
}
