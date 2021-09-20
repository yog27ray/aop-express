import { v4 as uuid } from 'uuid';
import { KeyValue } from '../../typings/request-response-type';
import { Logger } from '../../util/logger';
import { StorageAdapter } from '../storage-adapter';
import { MongoDBConnection } from './mongo-d-b-connection';

const log = Logger.instance('MongoDBAdapter');

class MongoDBAdapter extends StorageAdapter {
  private readonly connection: MongoDBConnection;

  private static dbToSystemItem(row: { [key: string]: any, id?: string }): KeyValue {
    if (!row) {
      return row;
    }
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

  count(table: string, where: { [p: string]: unknown }, option: { skip?: number; }): Promise<number> {
    return this.connection.count(table, where, option);
  }

  async find(
    table: string,
    where: { [p: string]: unknown },
    option: { limit?: number; skip?: number; sort?: { [key: string]: 1 | -1 } }): Promise<Array<KeyValue>> {
    const items = await this.connection.find(table, where, option);
    return items.map((item: KeyValue) => MongoDBAdapter.dbToSystemItem(item));
  }

  async findOne(
    table: string,
    where: { [p: string]: unknown },
    option: { limit?: number; skip?: number; sort?: { [key: string]: 1 | -1 } }): Promise<KeyValue> {
    const item = await this.connection.findOne(table, where, option);
    return MongoDBAdapter.dbToSystemItem(item);
  }

  async create(table: string, data: Record<string, unknown>): Promise<string> {
    const id = uuid().replace(new RegExp('-', 'g'), '');
    return this.connection.insert(table, { ...data, id });
  }

  async update(table: string, id: string, data: { [p: string]: unknown }): Promise<void> {
    await this.connection.update(table, id, data);
  }

  async deleteOne(table: string, where: KeyValue): Promise<void> {
    await this.connection.deleteOne(table, where);
  }
}

export { MongoDBAdapter };
