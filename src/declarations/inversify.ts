import { Container, injectable } from 'inversify';
import { Base } from './base';

const serviceContainer = new Container({});
const controllerContainer = new Container({});
const factoryContainer = new Container({});
const middlewareContainer = new Container({});

function loadInContainer(container: Container, target: new () => Base): void {
  if (!target) {
    return;
  }
  injectable()(target);
  container.bind(target).to(target).inSingletonScope();
}

export { loadInContainer, serviceContainer, controllerContainer, factoryContainer, middlewareContainer };
