import { Middleware } from '../declarations';
export declare function middleware(): (target: new () => Middleware) => void;
