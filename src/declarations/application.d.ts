import { Express } from 'express';
import { Base } from './base';
export declare class Application extends Base {
    constructor();
    beforeRouteRegistration(app: Express): void;
    afterRouteRegistration(app: Express): void;
    get app(): Express;
    protected getProvider<T>(table: new () => T): T;
    private registerApplicationRoutes;
    private startServer;
    private generateControllerRoutes;
}
