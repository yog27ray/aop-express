"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* tslint:disable:no-empty */
const express_1 = __importDefault(require("express"));
const route_1 = require("../annotation/route");
const base_1 = require("./base");
const class_config_1 = require("./class-config");
const inversify_1 = require("./inversify");
class Application extends base_1.Base {
    static getApp() {
        return (0, class_config_1.getConfig)(this.aopId).app;
    }
    constructor() {
        super();
        const applicationConfig = (0, class_config_1.getConfig)(this.constructor.aopId);
        this.beforeRouteRegistration(applicationConfig.app);
        if (applicationConfig.module) {
            const MainModule = applicationConfig.module;
            MainModule.loadContainer();
            const MainModuleConfig = (0, class_config_1.getConfig)(MainModule.aopId);
            const routes = this.generateControllerRoutes(MainModuleConfig.controller);
            this.registerApplicationRoutes(applicationConfig.app, routes, applicationConfig.pathPrefix);
            this.afterRouteRegistration(applicationConfig.app);
        }
        this.startServer(applicationConfig);
    }
    beforeRouteRegistration(app) { }
    afterRouteRegistration(app) { }
    afterServerStart() { }
    getProvider(table) {
        return inversify_1.providerContainer.get(table);
    }
    registerApplicationRoutes(app, applicationRoutes, pathPrefix) {
        applicationRoutes.forEach((each) => {
            const { path, middleware } = each;
            const method = each.method || 'use';
            const router = express_1.default.Router();
            router[method.toLowerCase().trim()](path, ...middleware);
            app.use(pathPrefix || '', router);
        });
    }
    startServer(applicationConfig) {
        applicationConfig.server.listen(applicationConfig.port, applicationConfig.ip, () => {
            // eslint-disable-next-line no-console
            console.log('Express server listening on %d, listening on "%s"', applicationConfig.port, applicationConfig.ip);
            this.afterServerStart();
        });
    }
    generateControllerRoutes(CurrentController) {
        const routes = [];
        const controller = inversify_1.controllerContainer.get(CurrentController);
        const controllerRoutes = controller.routes || [];
        routes.push(...controllerRoutes.map((controllerRoute) => {
            if (controllerRoute.middlewareClass) {
                controllerRoute.middleware.push(...(0, route_1.createMiddlewareHandler)(controllerRoute.middlewareClass));
            }
            return {
                method: controllerRoute.method,
                path: controllerRoute.path,
                middleware: [...controllerRoute.middleware, (...args) => {
                        controller[controllerRoute.classMethod](...args);
                    }],
            };
        }));
        const CurrentControllerConfig = (0, class_config_1.getConfig)(CurrentController.aopId);
        const controllerClassRoutes = CurrentControllerConfig.routes || [];
        const controllerClassMiddlewares = CurrentControllerConfig.middleware || [];
        const childrenRoutes = controllerClassRoutes.map((controllerClassRoute) => {
            const subRoutes = this.generateControllerRoutes(controllerClassRoute.child);
            return subRoutes.map((subRoute) => ({
                method: subRoute.method,
                classMethod: subRoute.classMethod,
                middleware: subRoute.middleware || [],
                path: `${controllerClassRoute.path}${subRoute.path}`,
            }));
        }).flat();
        routes.push(...childrenRoutes);
        routes.forEach((route_) => {
            const route = route_;
            route.middleware = [...(0, route_1.createMiddlewareHandler)(controllerClassMiddlewares), ...route.middleware];
        });
        return routes;
    }
}
exports.Application = Application;
//# sourceMappingURL=application.js.map