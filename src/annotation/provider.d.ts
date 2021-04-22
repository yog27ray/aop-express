import { AOPProvider } from '../declarations';
export declare function Provider<T extends AOPProvider>(): (Target: new () => T) => void;
