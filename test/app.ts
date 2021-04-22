import { Express } from 'express';
// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { AOPApplication, Application } from '../src';
import { MainModule } from './app/main.module';

@Application({
  module: MainModule,
  port: 3001,
  ip: '0.0.0.0',
  pathPrefix: '/api',
})
class App extends AOPApplication {
}

const { app }: { app: Express } = App;

// Expose app
export { app };
