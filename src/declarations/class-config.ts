import { v4 as uuid } from 'uuid';

const classConfig: Record<string, Record<string, unknown>> = {};

function setConfig(config: { [key: string]: unknown }): string {
  const id = uuid();
  classConfig[id] = { ...config };
  return id;
}

function getConfig(id: string): { [key: string]: unknown } {
  return classConfig[id] || {};
}

function addToConfig(configName: string, params: { [key: string]: unknown }): void {
  const config = getConfig(configName);
  classConfig[configName] = { ...config, ...params };
}

export { setConfig, getConfig, addToConfig };
