import { Table } from '../declarations';
import { addToConfig, setConfig } from '../declarations/class-config';
import { loadInContainer, tableContainer } from '../declarations/inversify';
import { TableConfig } from '../typings/config';

export function table<
  Z,
  T extends Table<Z>>(config: TableConfig): (Target: new (attributes: Z) => T) => void {
  return function decorator(Target: new (attributes: Z) => T): void {
    Object.assign(Target, { aopId: setConfig(config) });
    addToConfig('Table', { [config.name]: Target });
    loadInContainer(tableContainer, Target);
  };
}
