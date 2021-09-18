import { Express } from 'express';
import morgan from 'morgan';
// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { Application, application } from '../src';
import { MainModule } from './app/main.module';
import { TestEnv } from './test-env';

@application({
  serverAddress: `http://localhost:${TestEnv.port}`,
  module: MainModule,
  port: TestEnv.port,
  ip: '0.0.0.0',
  pathPrefix: '/api',
  database: { uri: TestEnv.MongoURI },
})
class App extends Application {
  beforeRouteRegistration(app: Express): void {
    app.use(morgan('dev'));
  }
}

const app: Express = App.getApp();

// Expose app
export { app };
