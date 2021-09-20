import { Table } from '../declarations';
import { addToConfig, getConfig, setConfig } from '../declarations/class-config';
import { loadInContainer, tableContainer } from '../declarations/inversify';
import { TableConfig } from '../typings/config';

export function table<
  Z,
  T extends Table<Z>>(config_: TableConfig): (Target: new (attributes: Z) => T) => void {
  return function decorator(Target: new (attributes: Z) => T): void {
    const config = config_;
    if (!config.serverAddress) {
      config.serverAddress = (getConfig('applicationConfig') as { serverAddress: string }).serverAddress;
    }
    Object.assign(Target, { aopId: setConfig(config) });
    addToConfig('Table', { [config.name]: Target });
    loadInContainer(tableContainer, Target);
  };
}
