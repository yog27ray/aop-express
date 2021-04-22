// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { AOPController, AOPModule, AOPService } from '../declarations';
import { controllerContainer, loadInConstantContainer, loadInContainer, modelContainer, serviceContainer } from '../declarations/inversify';
import { MainModuleType } from '../typings/annotation';

export function Module<
  X extends new() => unknown = new() => unknown,
  Y extends AOPService<X> = AOPService<X>,
  Z extends AOPModule = AOPModule>(config: {
  modules?: Array<typeof AOPModule>;
  controller?: new () => AOPController<Y>;
  service?: new () => Y;
  model?: X;
} = {}): (Target: new () => Z) => void {
  function loadContainer(): void {
    if (this.config.modules) {
      this.config.modules.forEach((each: MainModuleType) => each.loadContainer());
    }
    loadInContainer(controllerContainer, this.config.controller);
    loadInContainer(serviceContainer, this.config.service);
    loadInConstantContainer(modelContainer, this.config.model);
    if (this.config.controller && this.config.service) {
      this.config.controller.config.service = this.config.service;
      if (this.config.model) {
        this.config.controller.config.service.config.model = this.config.model;
      }
    }
  }

  return function decorator(Target: new () => Z): void {
    Object.assign(Target, { config: { ...config }, loadContainer });
  };
}
