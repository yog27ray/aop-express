import { Module, module } from '../../src';
import { MainController } from './main.controller';
import { MainService } from './main.service';
import { V1Module } from './v1/v1.module';

@module({
  modules: [V1Module],
  controller: MainController,
  service: MainService,
})
export class MainModule extends Module {}
