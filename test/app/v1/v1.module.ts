import { Module, module } from '../../../src';
import { DatabaseModule } from './database/database.module';
import { SubModuleOneModule } from './sub-module-one/sub-module-one.module';
import { SubModuleTwoModule } from './sub-module-two/sub-module-two.module';
import { V1Controller } from './v1.controller';

@module({
  modules: [SubModuleOneModule, SubModuleTwoModule, DatabaseModule],
  controller: V1Controller,
})
export class V1Module extends Module {}
