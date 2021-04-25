import { Express } from 'express';
// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { Application, application } from '../src';
import { MainModule } from './app/main.module';

@application({
  module: MainModule,
  port: 3001,
  ip: '0.0.0.0',
  pathPrefix: '/api',
})
class App extends Application {
}

const { app }: { app?: Express } = App as { app?: Express };

// Expose app
export { app };
