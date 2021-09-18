import { AsyncLocalStorage } from 'async_hooks';
import { KeyValue } from '../typings/request-response-type';

const asyncLocalStorage = new AsyncLocalStorage<KeyValue<string>>();

export class ThreadLocalStorageAdapter {
  static set(map: KeyValue<string>, next: () => void): void {
    asyncLocalStorage.run(map, next);
  }

  static get(key: string): string {
    return (asyncLocalStorage.getStore() || {})[key];
  }
}
