/// <reference types="node" />
import * as http from 'http';
import { Express } from 'express';
import { Base } from './base';
import { ApplicationType } from '../typings/annotation';
export declare class AOPApplication extends Base {
    static app: Express;
    static server: http.Server;
    static config: ApplicationType;
    constructor();
    beforeRouteRegistration(app: Express): void;
    afterRouteRegistration(app: Express): void;
    private registerApplicationRoutes;
    private startServer;
    private generateControllerRoutes;
}
