import { AOPController, Controller } from '../../../src';
import { SubModuleOneController } from './sub-module-one/sub-module-one.controller';
import { SubModuleTwoController } from './sub-module-two/sub-module-two.controller';

@Controller({
  routes: [
    { path: '/one', child: SubModuleOneController },
    { path: '/two', child: SubModuleTwoController },
  ],
})
export class V1Controller extends AOPController {
}
