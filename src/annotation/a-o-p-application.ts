import express, { Express } from 'express';
import http from 'http';
import { AOPApplication } from '../declarations/a-o-p-application';
import { ApplicationType } from '../typings/annotation';

export function aopApplication<T extends AOPApplication>(config: ApplicationType) {
  return function decorator(Target_: new () => T & { app?: Express }): void {
    const Target = Target_;
    const app: Express = express();
    const server = http.createServer(app);
    Object.assign(AOPApplication, { config, app, server });
    // eslint-disable-next-line no-new
    new Target();
  };
}
