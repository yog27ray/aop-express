import { AOPController, AOPResponse } from '../../../../src';
import { SubModuleTwoService } from './sub-module-two.service';
export declare class SubModuleTwoController extends AOPController<SubModuleTwoService> {
    constructor();
    testPutMethod(): Promise<AOPResponse>;
}
