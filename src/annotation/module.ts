import { Container } from 'inversify';
// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { Controller, Module, Service } from '../declarations';
import { getConfig, setConfig } from '../declarations/class-config';
import { controllerContainer, loadInContainer, serviceContainer } from '../declarations/inversify';
import { ControllerConfig, ModuleConfig } from '../typings/config';

export function module<
  Y extends Service,
  Z extends Module>(config: {
  modules?: Array<typeof Module>;
  controller?: new () => Controller<Y>;
  service?: new () => Y;
} = {}): (Target: new () => Z) => void {
  function loadContainer(ParentServiceClasses: Array<unknown> = []): void {
    const CurrentModuleConfig = getConfig(this.aopId) as ModuleConfig;
    if (CurrentModuleConfig.service) {
      ParentServiceClasses.push(CurrentModuleConfig.service);
    }
    if (CurrentModuleConfig.modules) {
      CurrentModuleConfig.modules.forEach((each: typeof Module & {
        loadContainer?(ParentServiceClasses: Array<unknown>): void;
      }) => each.loadContainer([...ParentServiceClasses]));
    }
    loadInContainer(controllerContainer, CurrentModuleConfig.controller);
    loadInContainer(serviceContainer, CurrentModuleConfig.service);
    if (CurrentModuleConfig.controller && CurrentModuleConfig.service) {
      const ModuleControllerConfig = getConfig(
        (CurrentModuleConfig.controller as { aopId?: string }).aopId) as ControllerConfig & { service: unknown };
      ModuleControllerConfig.service = CurrentModuleConfig.service;
      const ServiceConfig = getConfig((ModuleControllerConfig.service as { aopId: string }).aopId) as { container?: Container; };
      ParentServiceClasses.forEach((ServiceClass: new () => unknown) => loadInContainer(ServiceConfig.container, ServiceClass));
    }
  }

  return function decorator(Target: new () => Z): void {
    Object.assign(Target, { aopId: setConfig(config), loadContainer });
  };
}
