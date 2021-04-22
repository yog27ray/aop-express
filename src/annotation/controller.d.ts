import { AOPController, AOPService } from '../declarations';
import { ControllerType } from '../typings/annotation';
export declare function Controller<X extends new () => unknown, Y extends AOPService<X>, Z extends AOPController<Y>>(config?: ControllerType): (Target: new () => Z) => void;
