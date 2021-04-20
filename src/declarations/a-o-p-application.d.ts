/// <reference types="node" />
import { Express } from 'express';
import * as http from 'http';
import { ApplicationType } from '../typings/annotation';
import { Base } from './base';
export declare class AOPApplication extends Base {
    static app: Express;
    static server: http.Server;
    static config: ApplicationType;
    constructor();
    beforeRouteRegistration(app: Express): void;
    afterRouteRegistration(app: Express): void;
    private loadProviders;
    private registerApplicationRoutes;
    private startServer;
    private generateControllerRoutes;
}
