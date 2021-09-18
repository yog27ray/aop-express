import { Controller, controller, DELETE, GET, POST, PUT, RouteResponse } from '../../../../src';
import { SubModuleOneService } from './sub-module-one.service';

@controller()
export class SubModuleOneController extends Controller<SubModuleOneService> {
  @GET('/health')
  health(): Promise<RouteResponse> {
    return Promise.resolve({ response: { message: 'success' } });
  }

  @GET('/provider')
  providerCall(): Promise<RouteResponse> {
    return Promise.resolve({ response: { message: this.service.providerCall() } });
  }

  @POST('/post')
  postCall(): Promise<RouteResponse> {
    return Promise.resolve({ response: { message: 'success' } });
  }

  @PUT('/put')
  putCall(): Promise<RouteResponse> {
    return Promise.resolve({ response: { message: 'success' } });
  }

  @GET('/get')
  getCall(): Promise<RouteResponse> {
    return Promise.resolve({ response: { message: 'success' } });
  }

  @DELETE('/delete')
  deleteCall(): Promise<RouteResponse> {
    return Promise.resolve({ response: { message: 'success' } });
  }
}
