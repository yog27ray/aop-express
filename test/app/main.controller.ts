import { AOPController, AOPResponse, Controller, GET } from '../../src';
import { MainService } from './main.service';
import { V1Controller } from './v1/v1.controller';

@Controller({
  routes: [
    { path: '/api', child: V1Controller },
  ],
})
export class MainController extends AOPController<MainService> {
  @GET('/')
  getMainController(): Promise<AOPResponse> {
    return Promise.resolve({ response: {} });
  }
}
