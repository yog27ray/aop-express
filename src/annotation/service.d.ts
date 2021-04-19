import { AOPService } from '../declarations';
import { ServiceType } from '../typings/annotation';
export declare function Service(config?: ServiceType): (Target: new () => AOPService) => void;
