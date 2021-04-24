import { Express } from 'express';
import { AOPApplication } from '../declarations';
import { ApplicationType } from '../typings/annotation';
export declare function Application<T extends AOPApplication>(config: ApplicationType): (Target: new () => T & {
    app?: Express;
}) => void;