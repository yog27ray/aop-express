import { Service } from '../declarations';
import { ServiceConfig } from '../typings/config';
export declare function service(config?: ServiceConfig): (Target: new () => Service) => void;
