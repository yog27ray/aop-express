import express, { Express } from 'express';
import * as http from 'http';
import { AuthenticationAdapter } from './adapter/authentication-adapter';
import { createMiddlewareHandler } from './annotation/route';
import { DatabaseController, initializeStorageAdapter } from './database/database.controller';
import { Base, Controller, Middleware } from './declarations';
import { getConfig } from './declarations/class-config';
import { controllerContainer, loadInContainer, providerContainer } from './declarations/inversify';
import { ApplicationConfig, ControllerConfig, ModuleConfig } from './typings/config';
import { RouteType } from './typings/route';
import { Logger } from './util/logger';

const logger = Logger.instance('Application');

export class Application extends Base {
  static getApp<T extends typeof Application>(this: T): Express {
    return (getConfig((this as { aopId?: string }).aopId) as { app: Express }).app;
  }

  constructor() {
    super();
    const applicationConfig = getConfig((this.constructor as { aopId?: string }).aopId) as (
      ApplicationConfig & { app: Express; server: http.Server });
    const routes: Array<RouteType> = [];
    if (applicationConfig.database) {
      loadInContainer(controllerContainer, DatabaseController);
      initializeStorageAdapter(applicationConfig.database);
      routes.push(...this.generateControllerRoutes(DatabaseController as typeof Controller).map((each_: RouteType) => {
        const each = each_;
        each.path = `/aop${each.path}`;
        return each;
      }));
    }
    this.beforeRouteRegistration(applicationConfig.app);
    applicationConfig.app.use(AuthenticationAdapter.middleware);
    if (applicationConfig.module) {
      const MainModule = applicationConfig.module as { aopId?: string, loadContainer?(): void; };
      MainModule.loadContainer();
      const MainModuleConfig: ModuleConfig = getConfig(MainModule.aopId);
      routes.push(...this.generateControllerRoutes(MainModuleConfig.controller));
    }
    this.registerApplicationRoutes(applicationConfig.app, routes, applicationConfig.pathPrefix);
    this.afterRouteRegistration(applicationConfig.app);
    this.startServer(applicationConfig);
  }

  beforeRouteRegistration(app: Express): void {
    logger.verbose('executing beforeRouteRegistration', !!app);
  }

  afterRouteRegistration(app: Express): void {
    logger.verbose('executing afterRouteRegistration', !!app);
  }

  protected getProvider<T>(table: new () => T): T {
    return providerContainer.get(table);
  }

  private registerApplicationRoutes(app: Express, applicationRoutes: Array<RouteType>, pathPrefix: string): void {
    applicationRoutes.forEach((each: RouteType) => {
      const { path, middleware } = each;
      const method = each.method || 'use';
      const router = express.Router();
      router[method.toLowerCase().trim()](path, ...middleware);
      app.use(pathPrefix || '', router);
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
    if (CurrentController !== undefined) {
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
    }
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
