import { AOPService } from '../../../../src';
import { SubModuleTwoModel } from './sub-module-two.model';
export declare class SubModuleTwoService extends AOPService<typeof SubModuleTwoModel> {
    testMethodCall(): string;
}
