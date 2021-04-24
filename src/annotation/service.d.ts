import { AOPService } from '../declarations';
import { ServiceConfig } from '../typings/config';
export declare function Service(config?: ServiceConfig): (Target: new () => AOPService) => void;
