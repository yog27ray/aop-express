import { Module, module } from '../../../../src';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';

@module({
  controller: DatabaseController,
  service: DatabaseService,
})
export class DatabaseModule extends Module {
}
