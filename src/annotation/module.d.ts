import 'reflect-metadata';
import { Controller, Module, Service } from '../declarations';
export declare function module<X extends new () => unknown, Y extends Service<X>, Z extends Module>(config?: {
    modules?: Array<typeof Module>;
    controller?: new () => Controller<Y>;
    service?: new () => Y;
    model?: X;
}): (Target: new () => Z) => void;
