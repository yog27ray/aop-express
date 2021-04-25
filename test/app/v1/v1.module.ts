import { Module, module } from '../../../src';
import { SubModuleOneModule } from './sub-module-one/sub-module-one.module';
import { SubModuleTwoModule } from './sub-module-two/sub-module-two.module';
import { V1Controller } from './v1.controller';

@module({
  modules: [SubModuleOneModule, SubModuleTwoModule],
  controller: V1Controller,
})
export class V1Module extends Module {}
