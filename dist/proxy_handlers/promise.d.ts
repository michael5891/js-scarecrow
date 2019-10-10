import { BaseProxyHandler } from "./base";
/**
 * None es6 promise polyfill as bluebird will have a simple 'then' function.
 */
export declare function isPromisePolyfill(obj: any): boolean;
/**
 * Native es6
 */
export declare function isPromiseNative(obj: any): boolean;
export declare function isPromise(obj: any): boolean;
export declare class PromiseProxyHandler extends BaseProxyHandler {
    constructor();
    get(target: any, prop: any): any;
    protected proxify(target?: any, name?: any): any;
}
