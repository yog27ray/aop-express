import { AOPController, AOPService } from '../declarations';
import { ControllerConfig } from '../typings/config';
export declare function Controller<X extends new () => unknown, Y extends AOPService<X>, Z extends AOPController<Y>>(config?: ControllerConfig): (Target: new () => Z) => void;
