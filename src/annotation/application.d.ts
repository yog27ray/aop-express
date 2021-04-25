import { Express } from 'express';
import { Application } from '../declarations';
import { ApplicationConfig } from '../typings/config';
export declare function application<T extends Application>(config: ApplicationConfig): (Target: new () => T & {
    app?: Express;
}) => void;
