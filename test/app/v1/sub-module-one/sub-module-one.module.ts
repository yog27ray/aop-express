import { AOPModule, Module } from '../../../../src';
import { SubModuleOneController } from './sub-module-one.controller';
import { SubModuleOneService } from './sub-module-one.service';

@Module({
  controller: SubModuleOneController,
  service: SubModuleOneService,
})
export class SubModuleOneModule extends AOPModule {}
