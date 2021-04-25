import { Module, module } from '../../../../src';
import { SubModuleOneController } from './sub-module-one.controller';
import { SubModuleOneService } from './sub-module-one.service';

@module({
  controller: SubModuleOneController,
  service: SubModuleOneService,
})
export class SubModuleOneModule extends Module {}
