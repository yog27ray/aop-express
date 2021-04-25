import express, { Express } from 'express';
import http from 'http';
import { Application } from '../declarations';
import { setConfig } from '../declarations/class-config';
import { ApplicationConfig } from '../typings/config';

export function application<T extends Application>(config: ApplicationConfig): (Target: new () => T & { app?: Express }) => void {
  return function decorator(Target: new () => T & { app?: Express }): void {
    const app: Express = express();
    const server = http.createServer(app);
    Object.assign(Target, { aopId: setConfig({ ...config, app, server }) });
    // eslint-disable-next-line no-new
    new Target();
  };
}
