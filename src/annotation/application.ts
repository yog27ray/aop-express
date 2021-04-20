import express, { Express } from 'express';
import http from 'http';
import { AOPApplication } from '../declarations';
import { ApplicationType } from '../typings/annotation';

export function Application<T extends AOPApplication>(config: ApplicationType): (Target: new () => T & { app?: Express }) => void {
  return function decorator(Target_: new () => T & { app?: Express }): void {
    const Target = Target_;
    const app: Express = express();
    const server = http.createServer(app);
    Object.assign(AOPApplication, { config, app, server });
    // eslint-disable-next-line no-new
    new Target();
  };
}
