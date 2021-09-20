import { KeyValue } from '../typings/request-response-type';

export abstract class StorageAdapter {
  abstract count(tableName: string, where: Record<string, unknown>, option: { skip?: number; }): Promise<number>;
  abstract find(
    tableName: string,
    where: Record<string, unknown>,
    option: { limit?: number; skip?: number; sort?: { [key: string]: number } }): Promise<Array<KeyValue>>;
  abstract findOne(tableName: string, where: Record<string, unknown>, { skip, sort }?: { skip?: number; sort?: { [key: string]: number } })
    : Promise<KeyValue>;
  abstract create(tableName: string, data: Record<string, unknown>): Promise<string>;
  abstract update(tableName: string, id: string, data: Record<string, unknown>): Promise<void>;
  abstract deleteOne(tableName: string, where: KeyValue): Promise<void>;
}
