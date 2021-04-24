/* tslint:disable:interface-over-type-literal */
import { AOPController, AOPMiddleware, AOPModule, AOPService } from '../declarations';

declare type ControllerConfig = {
  routes?: Array<{ path: string; child: new () => AOPController }>;
  middleware?: Array<new () => AOPMiddleware>;
};

// eslint-disable-next-line @typescript-eslint/ban-types
declare type ServiceConfig = {};

declare type ModuleConfig<T extends AOPService = undefined> = {
  modules?: Array<typeof AOPModule>;
  controller?: new () => AOPController<T>;
  service?: new () => T;
  model?: new () => unknown;
};

export { ControllerConfig, ModuleConfig, ServiceConfig };
