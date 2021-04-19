import { AOPController, AOPMiddleware, AOPModule, AOPService } from '../declarations';
export declare interface ServiceType {
    config?: unknown;
}
export declare interface ModuleType {
    modules?: Array<typeof AOPModule>;
    controller?: new () => AOPController;
    service?: new () => AOPService;
}
export declare interface ControllerType {
    routes?: Array<{
        path: string;
        child: new () => AOPController;
    }>;
    middleware?: Array<new () => AOPMiddleware>;
}
export declare interface ApplicationType {
    module?: new () => AOPModule;
    pathPrefix?: string;
    port: number;
    ip: string;
}
export declare type ApplicationModuleType = (new () => AOPModule) & {
    config?: ModuleType;
    loadContainer?: () => void;
};
