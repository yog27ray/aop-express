// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { AOPModule } from '../declarations';
import { controllerContainer, loadInContainer, serviceContainer } from '../declarations/inversify';
import { MainModuleType, ModuleType } from '../typings/annotation';

export function Module<T extends AOPModule>(config: ModuleType): (Target: new () => T) => void {
  function loadContainer(): void {
    if (this.config.modules) {
      this.config.modules.forEach((each: MainModuleType) => each.loadContainer());
    }
    loadInContainer(controllerContainer, this.config.controller);
    loadInContainer(serviceContainer, this.config.service);
  }

  return function decorator(Target: new () => T): void {
    Object.assign(Target, { config: { ...config }, loadContainer });
  };
}
