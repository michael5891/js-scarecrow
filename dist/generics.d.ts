/**
 * Ignore native code as fn.call or native object flows as Map.forEach
 */
export declare function isNativeCodeProperty(value: {
    toString: any;
}): boolean;
export declare function isNativeFunctionCall(value: {
    toString: any;
}): boolean;
export declare function isNativeTypeCall(value: {
    toString: any;
}): boolean;
export declare function isFunction(value: any): boolean;
export declare function isSymbol(value: any): boolean;
export declare function bindFn(target: any, prop: any): any;
export declare function bindSymbol(target: any, prop: any): any;
