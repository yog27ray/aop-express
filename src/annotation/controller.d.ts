import { AOPController, AOPService } from '../declarations';
import { ControllerType } from '../typings/annotation';
export declare function Controller<A extends new () => unknown, B extends AOPService<A>, X extends new () => unknown, Y extends AOPService<X>, Z extends AOPController<Y>>(config?: ControllerType<B>): (Target: new () => Z) => void;
