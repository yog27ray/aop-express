import { Container } from 'inversify';
import { v4 as uuid } from 'uuid';

const classConfig: Record<string, Record<string, unknown>> = {};

function setConfig(config: { [key: string]: unknown }): string {
  const id = uuid();
  classConfig[id] = { ...config, container: new Container({}) };
  return id;
}

function getConfig(id: string): { [key: string]: unknown } {
  return classConfig[id];
}

export { setConfig, getConfig };
