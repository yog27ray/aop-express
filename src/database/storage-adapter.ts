import { Table } from '../declarations';
import { PartialClassAttribute } from '../typings/class-type';

export abstract class StorageAdapter {
  abstract count<T extends Table>(
    ModelClass: new(attributes: unknown) => T,
    where: Record<string, unknown>,
    option: { limit?: number; skip?: number; sort?: { [key: string]: number } }): Promise<number>;
  abstract find<T extends Table>(
    ModelClass: new(attributes: unknown) => T,
    where: Record<string, unknown>,
    option: { limit?: number; skip?: number; sort?: { [key: string]: number } }): Promise<Array<T>>;
  abstract findOne<T extends Table>(
    ModelClass: new(attributes: unknown) => T,
    where: Record<string, unknown>,
    { skip, sort, limit }: { limit?: number; skip?: number; sort?: { [key: string]: number } }): Promise<T>;
  abstract create(tableName: string, data: Record<string, unknown>): Promise<string>;
  abstract update<T extends Table>(
    ModelClass: new(attributes: unknown) => T,
    id: string,
    data: PartialClassAttribute<T>): Promise<void>;
}
