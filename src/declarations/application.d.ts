import { Express } from 'express';
import { Base } from './base';
export declare class Application extends Base {
    static getApp<T extends typeof Application>(this: T): Express;
    constructor();
    beforeRouteRegistration(app: Express): void;
    afterRouteRegistration(app: Express): void;
    protected getProvider<T>(table: new () => T): T;
    private registerApplicationRoutes;
    private startServer;
    private generateControllerRoutes;
}
