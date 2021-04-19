interface Abstract {
    prototype: unknown;
}
export declare function aopFactory(): (target: new () => unknown) => void;
export declare function aopFactoryConstant(bind: Abstract): (target: unknown) => void;
export {};
