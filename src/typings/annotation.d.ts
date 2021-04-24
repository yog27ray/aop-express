import { AOPModule } from '../declarations';
export declare interface ApplicationType {
    module?: new () => AOPModule;
    pathPrefix?: string;
    port: number;
    ip: string;
}
export declare type MainModuleType = (new () => AOPModule) & {
    aopId?: string;
    loadContainer?(): void;
};
