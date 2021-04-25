import { Module, module } from '../../../../src';
import { SubModuleTwoController } from './sub-module-two.controller';
import { SubModuleTwoModel } from './sub-module-two.model';
import { SubModuleTwoService } from './sub-module-two.service';

@module({
  controller: SubModuleTwoController,
  service: SubModuleTwoService,
  model: SubModuleTwoModel,
})
export class SubModuleTwoModule extends Module {}
