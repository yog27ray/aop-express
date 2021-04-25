import { Provider } from '../declarations';
export declare function provider<T extends Provider>(): (Target: new () => T) => void;
