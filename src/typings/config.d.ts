import { Controller, Middleware, Module, Service } from '../declarations';
declare type ControllerConfig = {
    routes?: Array<{
        path: string;
        child: new () => Controller;
    }>;
    middleware?: Array<new () => Middleware>;
};
declare type ServiceConfig = {};
declare type ModuleConfig<T extends Service = undefined> = {
    modules?: Array<typeof Module>;
    controller?: new () => Controller<T>;
    service?: new () => T;
    model?: new () => unknown;
};
declare type ApplicationConfig = {
    module?: new () => Module;
    pathPrefix?: string;
    port: number;
    ip: string;
};
export { ApplicationConfig, ControllerConfig, ModuleConfig, ServiceConfig };
