import { ThreadLocalStorageAdapter } from '../adapter/thread-local-storage-adapter';
import { Controller } from '../declarations';
import { controller, DELETE, GET, POST, PUT, RouteResponse } from '../index';
import { DatabaseConfig } from '../typings/config';
import { MongoDBAdapter } from './mongodb/mongo-d-b-adapter';
import { StorageAdapter } from './storage-adapter';

let storageAdapter: StorageAdapter;

export function initializeStorageAdapter(databaseConfig: DatabaseConfig): void {
  storageAdapter = new MongoDBAdapter(databaseConfig.uri, databaseConfig.option);
}

@controller()
export class DatabaseController extends Controller {
  @POST('/tableName/:tableName/search')
  async findObjects(): Promise<RouteResponse> {
    await Promise.resolve();
    return { response: [] };
  }

  @POST('/tableName/:tableName')
  async createObject(): Promise<RouteResponse> {
    console.log('>>>>>>>>>>>create new object:', ThreadLocalStorageAdapter.get('token'));
    await Promise.resolve();
    return { response: {} };
  }

  @GET('/tableName/:tableName/:id')
  async findObjectById(): Promise<RouteResponse> {
    await Promise.resolve();
    return { response: {} };
  }

  @PUT('/tableName/:tableName/:id')
  async updateObjectById(): Promise<RouteResponse> {
    await Promise.resolve();
    return { response: {} };
  }

  @DELETE('/tableName/:tableName/:id')
  async deleteObjectById(): Promise<RouteResponse> {
    await Promise.resolve();
    return { response: {} };
  }
}
