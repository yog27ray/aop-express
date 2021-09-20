import { expect } from 'chai';
import fetch from 'node-fetch';
import { MongoDBConnection } from '../src/database/mongodb/mongo-d-b-connection';
import { Logger } from '../src/util/logger';
import { TestEnv } from './test-env';

const log = Logger.instance('TestServer');

function delay(milliSeconds: number = 100): Promise<any> {
  return new Promise((resolve: (value?: unknown) => void): unknown => setTimeout(resolve, milliSeconds));
}

export function dropDB(): Promise<any> {
  return new MongoDBConnection(TestEnv.MongoURI, {}).dropDatabase();
}

function waitForServerToBoot(): Promise<unknown> {
  return fetch('http://localhost:1234/api/v1/one/health')
    .then((response: { status: number }) => {
      if (response.status >= 200 && response.status < 300) {
        return 0;
      }
      return Promise.reject(Error('error'));
    })
    .catch(async () => {
      log.error('health api fail.');
      await delay();
      return waitForServerToBoot();
    });
}

before(async () => {
  // const mongo = await MongoMemoryServer.create();
  // TestEnv.MongoURI = `${mongo.getUri()}aop`;
  await import('./index');
  await waitForServerToBoot();
});
