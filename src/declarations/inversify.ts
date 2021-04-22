import { Container, injectable } from 'inversify';
import { Base } from './base';

const serviceContainer = new Container({});
const providerContainer = new Container({});
const controllerContainer = new Container({});
const modelContainer = new Container({});
const middlewareContainer = new Container({});

function loadInConstantContainer(container: Container, target: new () => Base): void {
  if (!target) {
    return;
  }
  injectable()(target);
  container.bind(target).toConstantValue(target);
}

function loadInContainer(container: Container, target: new () => Base): void {
  if (!target) {
    return;
  }
  injectable()(target);
  container.bind(target).to(target).inSingletonScope();
}

export {
  loadInContainer,
  loadInConstantContainer,
  serviceContainer,
  controllerContainer,
  modelContainer,
  middlewareContainer,
  providerContainer,
};