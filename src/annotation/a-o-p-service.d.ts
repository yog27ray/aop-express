import { AOPService } from '../declarations';
import { ServiceType } from '../typings/annotation';
export declare function aopService(config?: ServiceType): (Target: new () => AOPService) => void;
