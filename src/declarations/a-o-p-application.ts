/* tslint:disable:no-empty max-line-length */
// eslint-disable-next-line max-len
/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-unused-vars-experimental,@typescript-eslint/no-empty-function,no-unused-vars */
import express, { Express } from 'express';
import * as http from 'http';
import { createMiddlewareHandler } from '../annotation/route';
import { ApplicationModuleType, ApplicationType, ControllerType } from '../typings/annotation';
import { AOPController, RouteType } from './a-o-p-controller';
import { AOPMiddleware } from './a-o-p-middleware';
import { Base } from './base';
import { controllerContainer } from './inversify';

export class AOPApplication extends Base {
  static app: Express;
  static server: http.Server;
  static config: ApplicationType;

  constructor() {
    super();
    this.beforeRouteRegistration(AOPApplication.app);
    const ApplicationModule: ApplicationModuleType = AOPApplication.config.module;
    ApplicationModule.loadContainer();
    const routes = this.generateControllerRoutes(ApplicationModule.config.controller);
    this.registerApplicationRoutes(AOPApplication.app, routes);
    this.afterRouteRegistration(AOPApplication.app);
    this.startServer();
  }

  beforeRouteRegistration(app: Express): void {}

  afterRouteRegistration(app: Express): void {}

  private registerApplicationRoutes(app: Express, applicationRoutes: Array<RouteType>): void {
    applicationRoutes.forEach((each: RouteType) => {
      const { path, middleware } = each;
      const method = each.method || 'use';
      const router = express.Router();
      router[method.toLowerCase().trim()](path, ...middleware);
      app.use(AOPApplication.config.pathPrefix || '', router);
    });
  }

  private startServer(): void {
    AOPApplication.server.listen(AOPApplication.config.port, AOPApplication.config.ip, () => {
      // eslint-disable-next-line no-console
      console.log('Express server listening on %d, listening on "%s"', AOPApplication.config.port, AOPApplication.config.ip);
    });
  }

  private generateControllerRoutes(CurrentController: (new() => AOPController) & { config?: ControllerType }): Array<RouteType> {
    const routes: Array<RouteType> = [];
    const controller: AOPController & {
      routes?: Array<RouteType & { middlewareClass?: Array<new () => AOPMiddleware> }>;
      test: number,
    } = controllerContainer.get(CurrentController);
    const controllerRoutes = controller.routes || [];
    routes.push(...controllerRoutes.map((controllerRoute) => {
      if (controllerRoute.middlewareClass) {
        controllerRoute.middleware.push(...createMiddlewareHandler(controllerRoute.middlewareClass));
      }
      return {
        method: controllerRoute.method,
        path: controllerRoute.path,
        middleware: [...controllerRoute.middleware, (...args: Array<unknown>): void => controller[controllerRoute.classMethod](...args)],
      };
    }));
    const controllerClassRoutes = CurrentController.config.routes || [];
    const controllerClassMiddlewares = CurrentController.config.middleware || [];
    const childrenRoutes = controllerClassRoutes.map((controllerClassRoute: { path: string; child: new () => AOPController}) => {
      const subRoutes = this.generateControllerRoutes(controllerClassRoute.child);
      return subRoutes.map((subRoute: RouteType): RouteType => ({
        method: subRoute.method,
        classMethod: subRoute.classMethod,
        middleware: subRoute.middleware || [],
        path: `${controllerClassRoute.path}${subRoute.path}`,
      }));
    }).flat();
    routes.push(...childrenRoutes);
    routes.forEach((route_) => {
      const route = route_;
      route.middleware = [...createMiddlewareHandler(controllerClassMiddlewares), ...route.middleware];
    });
    return routes;
  }
}
