import { AOPController } from '../declarations';
import { ControllerType } from '../typings/annotation';
export declare function Controller<T extends AOPController>(config?: ControllerType): (Target: new () => T) => void;
