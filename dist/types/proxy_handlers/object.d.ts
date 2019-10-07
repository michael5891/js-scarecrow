import { BaseProxyHandler } from "./base";
import { IObjectProxyHandlerOptions } from "./object.interface";
export declare class ObjectProxyHandler extends BaseProxyHandler {
    readonly propsFilter: (name: string | any) => boolean;
    readonly onGetMissingProperty: (msg: string, name: string) => void;
    readonly onSetMissingProperty: (msg: string, name: string, value: any) => void;
    readonly onCallMissingMethod: (msg: string, thisArg: any, args: any[]) => void;
    constructor({ propsFilter, onGetMissingProperty, onSetMissingProperty, onCallMissingMethod, }?: IObjectProxyHandlerOptions);
    get(target: {}, name: string | number | symbol, receiver?: any): any;
    set(target: {}, name: string | number | symbol, value: any): boolean;
    apply(target: Function, thisArg: any, argsList: any[]): any;
    protected proxify(target?: any, name?: any): any;
    protected stringify(target: any): any;
}
