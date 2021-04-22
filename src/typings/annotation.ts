import { AOPController, AOPMiddleware, AOPModule, AOPService } from '../declarations';

export declare interface ServiceType {
  config?: unknown;
}

export declare interface ModuleType<T extends AOPService = undefined> {
  modules?: Array<typeof AOPModule>;
  controller?: new () => AOPController<T>;
  service?: new () => T;
}

export declare interface ControllerType {
  routes?: Array<{ path: string; child: new () => AOPController }>;
  middleware?: Array<new () => AOPMiddleware>;
}

export declare interface ApplicationType {
  module?: new () => AOPModule;
  pathPrefix?: string;
  port: number;
  ip: string;
}

export declare type MainModuleType = (new () => AOPModule) & { config?: ModuleType, loadContainer?(): void; };