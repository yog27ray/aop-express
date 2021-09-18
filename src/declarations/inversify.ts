import { Container, injectable } from 'inversify';
import { Base } from './base';

const serviceContainer = new Container({});
const factoryContainer = new Container({});
const providerContainer = new Container({});
const controllerContainer = new Container({});
const middlewareContainer = new Container({});
const tableContainer = new Container({});
const adapterContainer = new Container({});

function loadInConstantContainer(container: Container, target: new () => Base): void {
  if (!target) {
    return;
  }
  if (!Reflect.hasOwnMetadata('inversify:paramtypes', target)) {
    injectable()(target);
  }
  container.bind(target).toConstantValue(target);
}

function loadInContainer(container: Container, target: (new (arg?: unknown) => Base) & { aopId?: string }): void {
  if (!target) {
    return;
  }
  if (!Reflect.hasOwnMetadata('inversify:paramtypes', target)) {
    injectable()(target);
  }
  container.bind(target).to(target).inSingletonScope();
}

export {
  loadInContainer,
  loadInConstantContainer,
  factoryContainer,
  serviceContainer,
  controllerContainer,
  middlewareContainer,
  providerContainer,
  tableContainer,
  adapterContainer,
};
