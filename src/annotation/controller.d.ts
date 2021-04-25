import { Controller, Service } from '../declarations';
import { ControllerConfig } from '../typings/config';
export declare function controller<X extends new () => unknown, Y extends Service<X>, Z extends Controller<Y>>(config?: ControllerConfig): (Target: new () => Z) => void;
