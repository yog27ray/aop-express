import { AOPController, AOPResponse } from '../../src';
import { MainService } from './main.service';
export declare class MainController extends AOPController<MainService> {
    getMainController(): Promise<AOPResponse>;
}
