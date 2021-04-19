"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AOPApplication = void 0;
const express_1 = __importDefault(require("express"));
const base_1 = require("./base");
const inversify_1 = require("./inversify");
const route_1 = require("../annotation/route");
class AOPApplication extends base_1.Base {
    constructor() {
        super();
        this.beforeRouteRegistration(AOPApplication.app);
        const ApplicationModule = AOPApplication.config.module;
        ApplicationModule.loadContainer();
        const routes = this.generateControllerRoutes(ApplicationModule.config.controller);
        this.registerApplicationRoutes(AOPApplication.app, routes);
        this.afterRouteRegistration(AOPApplication.app);
        this.startServer();
    }
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars,@typescript-eslint/no-unused-vars-experimental,no-unused-vars
    beforeRouteRegistration(app) { }
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars,@typescript-eslint/no-unused-vars-experimental,no-unused-vars
    afterRouteRegistration(app) { }
    registerApplicationRoutes(app, applicationRoutes) {
        applicationRoutes.forEach((each) => {
            const { path, middleware } = each;
            const method = each.method || 'use';
            const router = express_1.default.Router();
            router[method.toLowerCase().trim()](path, ...middleware);
            app.use(AOPApplication.config.pathPrefix || '', router);
        });
    }
    startServer() {
        AOPApplication.server.listen(AOPApplication.config.port, AOPApplication.config.ip, () => {
            // eslint-disable-next-line no-console
            console.log('Express server listening on %d, listening on "%s"', AOPApplication.config.port, AOPApplication.config.ip);
        });
    }
    generateControllerRoutes(CurrentController) {
        const routes = [];
        const controller = inversify_1.controllerContainer.get(CurrentController);
        const controllerRoutes = controller.routes || [];
        routes.push(...controllerRoutes.map((controllerRoute) => {
            if (controllerRoute.middlewareClass) {
                controllerRoute.middleware.push(...route_1.createMiddlewareHandler(controllerRoute.middlewareClass));
            }
            return {
                method: controllerRoute.method,
                path: controllerRoute.path,
                middleware: [...controllerRoute.middleware, (...args) => controller[controllerRoute.classMethod](...args)],
            };
        }));
        const controllerClassRoutes = CurrentController.config.routes || [];
        const controllerClassMiddlewares = CurrentController.config.middleware || [];
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
            route.middleware = [...route_1.createMiddlewareHandler(controllerClassMiddlewares), ...route.middleware];
        });
        return routes;
    }
}
exports.AOPApplication = AOPApplication;
//# sourceMappingURL=a-o-p-application.js.map