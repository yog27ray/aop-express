import { Controller, controller } from '../../../src';
import { SubModuleOneController } from './sub-module-one/sub-module-one.controller';
import { SubModuleTwoController } from './sub-module-two/sub-module-two.controller';

@controller({
  routes: [
    { path: '/one', child: SubModuleOneController },
    { path: '/two', child: SubModuleTwoController },
  ],
})
export class V1Controller extends Controller {
}
