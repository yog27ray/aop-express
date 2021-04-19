import 'reflect-metadata';
import { AOPModule } from '../declarations';
import { ModuleType } from '../typings/annotation';
export declare function aopModule<T extends AOPModule>(config: ModuleType): (Target: new () => T) => void;
