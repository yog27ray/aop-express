import { NetworkAdapter } from '../adapter/network-adapter';
import { TransformationAdapter } from '../adapter/transformation-adapter';
import { TableConfig } from '../typings/config';
import { KeyValue } from '../typings/request-response-type';
import { getConfig } from './class-config';
import { adapterContainer } from './inversify';

declare interface DefaultKeys {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const networkAdapter: NetworkAdapter = adapterContainer.get(NetworkAdapter);

export abstract class Table<KeyValueMap = Record<string, unknown>> {
  static async find<Z, T extends Table<Z>>(this: new (a?: KeyValue) => T): Promise<Array<T>> {
    const config = getConfig((this as { aopId?: string }).aopId) as TableConfig;
    const response = await networkAdapter.post(`${config.serverAddress}/aop/tableName/${config.name}/search`) as Array<KeyValue>;
    return response.map((each: KeyValue) => Table.fromJSON.call(this, each) as T);
  }

  static async count<Z, T extends Table<Z>>(this: new (a?: KeyValue) => T): Promise<number> {
    const config = getConfig((this as { aopId?: string }).aopId) as TableConfig;
    const { count } = await networkAdapter.post(`${config.serverAddress}/aop/tableName/${config.name}/count`) as { count: number };
    return count;
  }

  private static fromJSON<Z, T extends Table<Z>>(this: new (a?: KeyValue) => T, each: KeyValue): T {
    const newObject = new this(each);
    Object.keys(newObject.dirtyMap).forEach((key: string) => (delete newObject.dirtyMap[key]));
    return newObject;
  }

  constructor(attributes: Partial<KeyValueMap> = {}) {
    Object.defineProperty(this, '_attributes', { enumerable: false, value: {} });
    Object.defineProperty(this, '_dirtyMap', { enumerable: false, value: {} });
    this.updateReceivedNetworkResponse(attributes);
  }

  dirtyKeys(): Array<string> {
    return Object.keys(this.dirtyMap);
  }

  set<K extends keyof KeyValueMap>(key: K, value: KeyValueMap[K]): void {
    if (['createdAt', 'updatedAt', 'id'].includes(key as string)) {
      throw Error(`${key} can't be modified`);
    }
    this.dirtyMap[key] = true;
    this.attributes[key] = value;
  }

  get<K extends keyof(KeyValueMap & DefaultKeys)>(key: K): (KeyValueMap & DefaultKeys)[K] {
    return this.attributes[key];
  }

  async save<T extends Table<KeyValueMap>>(this: T, attributes: Partial<KeyValueMap> = {}): Promise<T> {
    Object.keys(attributes).forEach((key: string) => this.set(key as keyof KeyValueMap, attributes[key]));
    const body = this.generateRequestBody();
    const config = getConfig((this.constructor as { aopId?: string }).aopId) as TableConfig;
    const response = await (this.id
      ? networkAdapter.put(`${config.serverAddress}/aop/tableName/${config.name}/${this.get('id')}`, { body })
      : networkAdapter.post(`${config.serverAddress}/aop/tableName/${config.name}`, { body }));
    this.updateReceivedNetworkResponse(response as KeyValue);
    Object.keys(this.dirtyMap).forEach((key: string) => (delete this.dirtyMap[key]));
    return this;
  }

  toJSON<T extends Table<KeyValueMap & DefaultKeys>>(this: T): Partial<KeyValueMap & DefaultKeys> {
    const json = {};
    Object.getOwnPropertyNames(this.attributes).forEach((property: string) => (json[property] = this[property]));
    return json;
  }

  get id(): string {
    return this.attributes.id;
  }

  set id(id: string) {
    Object.assign(this, { objectId: id });
    this.attributes.id = id;
  }

  get createdAt(): Date {
    return this.attributes.createdAt;
  }

  get updatedAt(): Date {
    return this.attributes.updatedAt;
  }

  async fetch<T extends Table<KeyValueMap>>(this: T): Promise<T> {
    const config = getConfig((this.constructor as { aopId?: string }).aopId) as TableConfig;
    const response = await networkAdapter.get(`${config.serverAddress}/aop/tableName/${config.name}/${this.get('id')}`);
    this.updateReceivedNetworkResponse(response);
    return this;
  }

  async destroy(): Promise<void> {
    const config = getConfig((this.constructor as { aopId?: string }).aopId) as TableConfig;
    await networkAdapter.delete(`${config.serverAddress}/aop/tableName/${config.name}/${this.get('id')}`);
  }

  private get attributes(): KeyValueMap & DefaultKeys {
    return (this as unknown as { _attributes: KeyValueMap & DefaultKeys })._attributes;
  }

  private get dirtyMap(): Record<keyof(KeyValueMap & DefaultKeys), boolean> {
    return (this as unknown as { _dirtyMap: Record<keyof(KeyValueMap & DefaultKeys), boolean> })._dirtyMap;
  }

  private updateReceivedNetworkResponse(response: KeyValue<unknown>): void {
    const transformedResponse = TransformationAdapter.transformFromNetwork(response);
    Object.keys(transformedResponse).forEach((key: string) => {
      if (key === 'id') {
        Object.assign(this, { objectId: transformedResponse[key] });
      }
      this.attributes[key] = transformedResponse[key];
    });
  }

  private generateRequestBody(): string {
    const result: { data: KeyValue } = { data: {} };
    (this.dirtyKeys() as Array<keyof KeyValueMap>).forEach((each: keyof KeyValueMap) => (result.data[each as string] = this.get(each)));
    return JSON.stringify(TransformationAdapter.transformForNetwork(result));
  }
}
