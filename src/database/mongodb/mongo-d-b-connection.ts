import { Db, MongoClient } from 'mongodb';

class MongoDBConnection {
  private readonly _option: { [key: string]: any };

  private readonly _uri: string;

  private readonly _dBName: string;

  private client: MongoClient;

  constructor(uri: string, config: { [key: string]: unknown }) {
    this._uri = uri;
    this._option = config;
    if (this._uri) {
      this._dBName = uri.split('?')[0].split('/').pop();
    }
  }

  isConnected(): boolean {
    return !!this.client;
  }

  async connect(): Promise<any> {
    if (this.isConnected()) {
      return;
    }
    let client: MongoClient;
    if (!this.client) {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      client = new MongoClient(this._uri, this._option);
    } else {
      ({ client } = this);
    }
    this.client = await client.connect();
  }

  async find(
    tableName: string,
    query_: any = {},
    option: { limit?: number; skip?: number; sort?: { [key: string]: 1 | -1 } }): Promise<Array<any>> {
    await this.connect();
    const query = query_;
    if (query.id) {
      query._id = query.id;
      delete query.id;
    }
    return this.getDB().collection(tableName).find(query, option).toArray();
  }

  async findOne(
    tableName: string,
    filter_: Record<string, unknown> = {},
    option: { limit?: number; skip?: number; sort?: { [key: string]: 1 | -1 } }): Promise<Record<string, unknown>> {
    const filter = filter_;
    await this.connect();
    if (filter.id) {
      filter._id = filter.id;
      delete filter.id;
    }
    return this.getDB().collection(tableName).findOne(filter, option);
  }

  async dropDatabase(): Promise<any> {
    if (!this._dBName) {
      return Promise.resolve();
    }
    await this.connect();
    return new Promise((resolve: (item: boolean) => void, reject: (error: Error) => void) => {
      this.getDB().dropDatabase((error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      });
    });
  }

  async insert(collectionName: string, item_: { [key: string]: string }): Promise<string> {
    await this.connect();
    const item = item_;
    if (item.id) {
      item._id = item.id;
      delete item.id;
    }
    const newDocument = await this.getDB().collection(collectionName).insertOne(item);
    return newDocument.insertedId.toString();
  }

  async update(collectionName: string, documentId: string, document: { [key: string]: any }): Promise<void> {
    await this.connect();
    await this.getDB().collection(collectionName).updateOne({ _id: documentId }, { $set: { ...document, updatedAt: new Date() } });
  }

  async deleteOne(collectionName: string, filter: { [key: string]: any }): Promise<void> {
    await this.connect();
    await this.getDB().collection(collectionName).deleteOne(filter);
  }

  async count(
    collectionName: string,
    filter: { [key: string]: any },
    option: { limit?: number; skip?: number; sort?: { [key: string]: number } }): Promise<number> {
    await this.connect();
    return this.getDB().collection(collectionName).countDocuments(filter, option);
  }

  async deleteMany(collectionName: string, filter: { [key: string]: any }): Promise<void> {
    await this.connect();
    await this.getDB().collection(collectionName).deleteMany(filter);
  }

  private getDB(): Db {
    return this.client.db(this._dBName);
  }
}

export { MongoDBConnection };
