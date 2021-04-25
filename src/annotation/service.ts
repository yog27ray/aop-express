import { Container } from 'inversify';
import { Service } from '../declarations';
import { setConfig } from '../declarations/class-config';
import { ServiceConfig } from '../typings/config';

export function service(config: ServiceConfig = {}): (Target: new () => Service) => void {
  return function decorator(Target: new () => Service): void {
    Object.assign(Target, { aopId: setConfig({ ...config, container: new Container({}) }) });
  };
}
