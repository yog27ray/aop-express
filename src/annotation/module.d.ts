import 'reflect-metadata';
import { AOPController, AOPModule, AOPService } from '../declarations';
export declare function Module<X extends new () => unknown = new () => unknown, Y extends AOPService<X> = AOPService<X>, Z extends AOPModule = AOPModule>(config?: {
    modules?: Array<typeof AOPModule>;
    controller?: new () => AOPController<Y>;
    service?: new () => Y;
    model?: X;
}): (Target: new () => Z) => void;
