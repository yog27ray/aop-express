/// <reference types="node" />
import { Express } from 'express';
import * as http from 'http';
import { ApplicationType } from '../typings/annotation';
import { AOPService } from './a-o-p-service';
import { Base } from './base';
export declare class AOPApplication extends Base {
    static app: Express;
    static server: http.Server;
    static config: ApplicationType;
    constructor();
    beforeRouteRegistration(app: Express): void;
    afterRouteRegistration(app: Express): void;
    protected getService<T extends AOPService>(table: new () => T): T;
    protected getProvider<T>(table: new () => T): T;
    private registerApplicationRoutes;
    private startServer;
    private generateControllerRoutes;
}
