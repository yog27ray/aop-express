import { AOPController } from '../declarations';
import { ControllerType } from '../typings/annotation';
export declare function aopController<T extends AOPController>(config?: ControllerType): (Target: new () => T) => void;
