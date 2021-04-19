import { Express } from 'express';
import { AOPApplication } from '../declarations/a-o-p-application';
import { ApplicationType } from '../typings/annotation';
export declare function aopApplication<T extends AOPApplication>(config: ApplicationType): (Target_: new () => T & {
    app?: Express;
}) => void;
