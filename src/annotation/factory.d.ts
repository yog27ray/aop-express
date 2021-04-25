import { Factory } from '../declarations';
export declare function factory<T extends Factory>(): (Target: new () => T) => void;
