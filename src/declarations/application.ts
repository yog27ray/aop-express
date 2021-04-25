/* tslint:disable:no-empty max-line-length */
// eslint-disable-next-line max-len
/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-unused-vars-experimental,@typescript-eslint/no-empty-function,no-unused-vars */
import express, { Express } from 'express';
import * as http from 'http';
import { createMiddlewareHandler } from '../annotation/route';
import { ApplicationConfig, ControllerConfig, ModuleConfig } from '../typings/config';
import { RouteType } from '../typings/route';
import { Base } from './base';
import { getConfig } from './class-config';
import { Controller } from './controller';
import { controllerContainer, providerContainer } from './inversify';
import { Middleware } from './middleware';

export class Application extends Base {
  static getApp<T extends typeof Application>(this: T): Express {
    return (getConfig((this as { aopId?: string }).aopId) as { app: Express }).app;
  }

  constructor() {
    super();
    const applicationConfig = getConfig((this.constructor as { aopId?: string }).aopId) as (
      ApplicationConfig & { app: Express; server: http.Server });
    this.beforeRouteRegistration(applicationConfig.app);
    if (applicationConfig.module) {
      const MainModule = applicationConfig.module as { aopId?: string, loadContainer?(): void; };
      MainModule.loadContainer();
      const MainModuleConfig: ModuleConfig = getConfig(MainModule.aopId);
      const routes = this.generateControllerRoutes(MainModuleConfig.controller);
      this.registerApplicationRoutes(applicationConfig.app, routes);
      this.afterRouteRegistration(applicationConfig.app);
    }
    this.startServer(applicationConfig);
  }

  beforeRouteRegistration(app: Express): void {}

  afterRouteRegistration(app: Express): void {}

  protected getProvider<T>(table: new () => T): T {
    return providerContainer.get(table);
  }

  private registerApplicationRoutes(app: Express, applicationRoutes: Array<RouteType>): void {
    applicationRoutes.forEach((each: RouteType) => {
      const { path, middleware } = each;
      const method = each.method || 'use';
      const router = express.Router();
      router[method.toLowerCase().trim()](path, ...middleware);
      // app.use(Application.config.pathPrefix || '', router);
    });
  }

  private startServer(applicationConfig: ApplicationConfig & { app: Express; server: http.Server }): void {
    applicationConfig.server.listen(applicationConfig.port, applicationConfig.ip, () => {
      // eslint-disable-next-line no-console
      console.log('Express server listening on %d, listening on "%s"', applicationConfig.port, applicationConfig.ip);
    });
  }

  private generateControllerRoutes(CurrentController: typeof Controller & { aopId?: string }): Array<RouteType> {
    const routes: Array<RouteType> = [];
    const controller: Controller & {
      routes?: Array<RouteType & { middlewareClass?: Array<new () => Middleware> }>;
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
    const CurrentControllerConfig: ControllerConfig = getConfig(CurrentController.aopId);
    const controllerClassRoutes = CurrentControllerConfig.routes || [];
    const controllerClassMiddlewares = CurrentControllerConfig.middleware || [];
    const childrenRoutes = controllerClassRoutes.map((controllerClassRoute: { path: string; child: typeof Controller}) => {
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
