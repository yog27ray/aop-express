import { Table } from '../index';
import { KeyValue } from '../typings/request-response-type';

export class TransformationAdapter {
  static transformForNetwork(input: unknown): unknown {
    if (input instanceof Array) {
      return (input as Array<unknown>).map((each: unknown) => TransformationAdapter.transformForNetwork(each));
    }
    if (input instanceof Table) {
      throw Error('Un-handled transformation Table');
      // const tableObject = input as Table;
      // const result: KeyValue = {};
      // return result;
    }
    if (input instanceof Date) {
      return { _iso: input.toISOString() };
    }
    if (typeof input === 'object') {
      return Object.keys(input).reduce((result_: KeyValue, key: string) => {
        const result = result_;
        result[key] = this.transformForNetwork(input[key]);
        return result;
      }, {});
    }
    return input;
  }

  static transformFromNetwork(input: unknown): unknown {
    if (input instanceof Array) {
      return (input as Array<unknown>).map((each: unknown) => TransformationAdapter.transformFromNetwork(each));
    }
    if (typeof input === 'object') {
      const item = input as KeyValue;
      const keys = Object.keys(input);
      if (keys.length === 1 && item._iso) {
        return new Date(item._iso as string);
      }
      return keys.reduce((result_: KeyValue, each: string) => {
        const result = result_;
        result[each] = this.transformFromNetwork(item[each]);
        return result;
      }, {});
    }
    return input;
  }
}
