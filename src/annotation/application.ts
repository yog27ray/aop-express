import express, { Express } from 'express';
import http from 'http';
import { Application } from '../application';
import { addToConfig, setConfig } from '../declarations/class-config';
import { ApplicationConfig } from '../typings/config';

export function application<T extends Application>(config: ApplicationConfig): (Target: new () => T & { app?: Express }) => void {
  return function decorator(Target: new () => T & { app?: Express }): void {
    const app: Express = express();
    const server = http.createServer(app);
    const aopId = setConfig({ ...config, app, server });
    Object.assign(Target, { aopId });
    const serverAddress = `${config.serverAddress}${config.pathPrefix || ''}`;
    addToConfig('applicationConfig', { serverAddress, aopId });
    // eslint-disable-next-line no-new
    new Target();
  };
}
