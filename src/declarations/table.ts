import { NetworkAdapter } from '../adapter/network-adapter';
import { TableConfig } from '../typings/config';
import { getConfig } from './class-config';
import { adapterContainer } from './inversify';

declare interface DefaultKeys {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const networkAdapter: NetworkAdapter = adapterContainer.get(NetworkAdapter);

export abstract class Table<KeyValueMap = Record<string, unknown>> {
  private readonly _config: TableConfig;
  private attributes: KeyValueMap & DefaultKeys = {} as KeyValueMap;
  private _dirtyMap: Record<keyof(KeyValueMap & DefaultKeys), boolean> = {} as Record<keyof(KeyValueMap & DefaultKeys), boolean>;

  constructor(attributes: Partial<KeyValueMap>) {
    this._config = getConfig((this.constructor as { aopId?: string }).aopId) as TableConfig;
    this._config.serverAddress = this._config.serverAddress || (getConfig('applicationConfig') as { serverAddress: string }).serverAddress;
    Object.keys(attributes).forEach((key: string) => (this.attributes[key] = attributes[key]));
    console.log('>>>>', this._config);
  }

  dirtyKeys(): Array<string> {
    return Object.keys(this._dirtyMap);
  }

  set<K extends keyof KeyValueMap>(key: K, value: KeyValueMap[K]): void {
    this._dirtyMap[key] = true;
    this.attributes[key] = value;
  }

  get<K extends keyof(KeyValueMap & DefaultKeys)>(key: K): (KeyValueMap & DefaultKeys)[K] {
    return this.attributes[key];
  }

  async save<T extends Table<KeyValueMap>>(this: T, attributes: Partial<KeyValueMap> = {}): Promise<T> {
    Object.keys(attributes).forEach((key: string) => this.set(key as keyof KeyValueMap, attributes[key]));
    const response = await (this.get('id')
      ? networkAdapter.put(`${this._config.serverAddress}/aop/tableName/${this._config.name}/${this.get('id')}`)
      : networkAdapter.post(`${this._config.serverAddress}/aop/tableName/${this._config.name}`));
    console.log('>>>>>>>>', 'response');
    this._dirtyMap = {} as Record<keyof(KeyValueMap & DefaultKeys), boolean>;
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
    this.attributes.id = id;
  }

  get createdAt(): Date {
    return this.attributes.createdAt;
  }

  get updatedAt(): Date {
    return this.attributes.updatedAt;
  }
}
