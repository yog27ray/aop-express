import { TransformationAdapter } from '../adapter/transformation-adapter';
import { Controller } from '../declarations';
import { controller, DELETE, GET, POST, PUT, RouteRequest, RouteResponse } from '../index';
import { DatabaseConfig } from '../typings/config';
import { KeyValue } from '../typings/request-response-type';
import { MongoDBAdapter } from './mongodb/mongo-d-b-adapter';
import { StorageAdapter } from './storage-adapter';

let storageAdapter: StorageAdapter;

export function initializeStorageAdapter(databaseConfig: DatabaseConfig): void {
  storageAdapter = new MongoDBAdapter(databaseConfig.uri, databaseConfig.option);
}

@controller()
export class DatabaseController extends Controller {
  @POST('/tableName/:tableName/search')
  async findObjects(req: RouteRequest): Promise<RouteResponse> {
    const data = TransformationAdapter.transformFromNetwork(req.body) as {
      where: KeyValue; limit: number; skip: number; sort: { [key: string]: 1 | -1}; };
    const response = await storageAdapter.find(req.params.tableName, data.where || {}, data);
    return { response: response.map((each: KeyValue) => TransformationAdapter.transformForNetwork(each) as KeyValue) };
  }

  @POST('/tableName/:tableName/count')
  async countObjects(req: RouteRequest): Promise<RouteResponse> {
    const data = TransformationAdapter.transformFromNetwork(req.body) as {
      where: KeyValue; limit: number; skip: number; sort: { [key: string]: 1 | -1}; };
    const count = await storageAdapter.count(req.params.tableName, data.where || {}, data);
    return { response: { count } };
  }

  @POST('/tableName/:tableName')
  async createObject(req: RouteRequest): Promise<RouteResponse> {
    const { data } = TransformationAdapter.transformFromNetwork(req.body) as { data: KeyValue };
    data.updatedAt = new Date();
    data.createdAt = data.updatedAt;
    const response = await storageAdapter.create(req.params.tableName, data);
    return { response: { ...TransformationAdapter.transformForNetwork(data) as KeyValue, id: response } };
  }

  @GET('/tableName/:tableName/:id')
  async findObjectById(req: RouteRequest): Promise<RouteResponse> {
    const result = await storageAdapter.findOne(req.params.tableName, { _id: req.params.id });
    return { response: TransformationAdapter.transformForNetwork(result) as KeyValue };
  }

  @PUT('/tableName/:tableName/:id')
  async updateObjectById(req: RouteRequest): Promise<RouteResponse> {
    const { data } = TransformationAdapter.transformFromNetwork(req.body) as { data: KeyValue };
    data.updatedAt = new Date();
    await storageAdapter.update(req.params.tableName, req.params.id, data);
    return { response: TransformationAdapter.transformForNetwork(data) as KeyValue };
  }

  @DELETE('/tableName/:tableName/:id')
  async deleteObjectById(req: RouteRequest): Promise<RouteResponse> {
    await storageAdapter.deleteOne(req.params.tableName, { _id: req.params.id });
    return { response: { id: req.params.id } };
  }
}
