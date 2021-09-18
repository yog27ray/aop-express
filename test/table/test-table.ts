import { Table, table } from '../../src';

@table({ name: 'TestTable' })
export class TestTable extends Table<{ variable: number }> {
}
