import 'reflect-metadata';
import { Container, injectable } from 'inversify';
import { Base, AOPModule } from '../declarations';
import { controllerContainer, serviceContainer } from '../declarations/inversify';
import { ApplicationModuleType, ModuleType } from '../typings/annotation';

export function aopModule<T extends AOPModule>(config: ModuleType): (Target: new () => T) => void {
  function loadInContainer(container: Container, target: new () => Base): void {
    if (!target) {
      return;
    }
    injectable()(target);
    container.bind(target).to(target).inSingletonScope();
  }

  function loadContainer(): void {
    if (this.config.modules) {
      this.config.modules.forEach((each: ApplicationModuleType) => each.loadContainer());
    }
    loadInContainer(controllerContainer, this.config.controller);
    loadInContainer(serviceContainer, this.config.service);
  }

  return function decorator(Target: new () => T): void {
    Object.assign(Target, { config: { ...config }, loadContainer });
  };
}
