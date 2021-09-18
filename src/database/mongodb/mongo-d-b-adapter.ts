import { v4 as uuid } from 'uuid';
import { Table } from '../../declarations';
import { Logger } from '../../util/logger';
import { StorageAdapter } from '../storage-adapter';
import { MongoDBConnection } from './mongo-d-b-connection';

const log = Logger.instance('MongoDBAdapter');

class MongoDBAdapter extends StorageAdapter {
  private readonly connection: MongoDBConnection;

  private static dbToSystemItem(row: { [key: string]: any, id?: string }): any {
    const document = { ...row };
    document.id = document._id as string;
    delete document._id;
    return document;
  }

  constructor(uri: string, option_: { [key: string]: unknown } = {}) {
    super();
    const option = { ...option_ };
    log.info('DatabaseConfig', uri, option);
    this.connection = new MongoDBConnection(uri, option);
  }

  count<Z extends Table, T extends new(attributes: unknown) => Z>(
    ModelClass: T,
    where: { [p: string]: unknown },
    option: { limit?: number; skip?: number; sort?: { [key: string]: number } }): Promise<number> {
    return this.connection.count(ModelClass.name, where, option);
  }

  async find<Z extends Table, T extends new(attributes: unknown) => Z>(
    ModelClass: T,
    where: { [p: string]: unknown },
    option: { limit?: number; skip?: number; sort?: { [key: string]: number } }): Promise<Array<Z>> {
    const items = await this.connection.find(ModelClass.name, where, option);
    return items.map((item: unknown) => new ModelClass(MongoDBAdapter.dbToSystemItem(item)));
  }

  async findOne<Z extends Table, T extends new(attributes: unknown) => Z>(
    ModelClass: T,
    where: { [p: string]: unknown },
    option: { limit?: number; skip?: number; sort?: { [key: string]: number } }): Promise<Z> {
    const item = await this.connection.findOne(ModelClass.name, where, option);
    if (!item) {
      return undefined;
    }
    return new ModelClass(MongoDBAdapter.dbToSystemItem(item));
  }

  async create(table: string, data: Record<string, unknown>): Promise<string> {
    const id = uuid();
    return this.connection.insert(table, { ...data, id });
    // if (!item) {
    //   return undefined;
    // }
    // return id;
  }

  async update<Z extends Table, T extends new(attributes: unknown) => Z>(
    ModelClass: T,
    id: string,
    data: { [p: string]: unknown }): Promise<void> {
    await this.connection.update(ModelClass.name, id, data);
  }
}

export { MongoDBAdapter };
