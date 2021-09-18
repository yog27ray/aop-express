import { Module, module } from '../../../../src';
import { SubModuleTwoController } from './sub-module-two.controller';
import { SubModuleTwoService } from './sub-module-two.service';

@module({ controller: SubModuleTwoController, service: SubModuleTwoService })
export class SubModuleTwoModule extends Module {}
