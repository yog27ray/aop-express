declare type ClassKey<T> = {
  [key in keyof T]: T[key] extends (...arg: Array<unknown>) => unknown ? never : key
}[keyof T];
export declare type ClassAttribute<T> = Pick<T, ClassKey<T>>;
export declare type PartialClassAttribute<T> = Partial<ClassAttribute<T>>;
