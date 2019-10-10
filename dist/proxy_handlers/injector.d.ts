import { BaseProxyHandler } from "./base";
import { ObjectProxyHandler } from "./object";
import { IInjectorProxyHandlerOptions } from "./object.interface";
export declare class InjectorProxyHandler extends BaseProxyHandler {
    readonly injector: (name: string | number | symbol) => any;
    readonly onGetMissingService: (msg: string, name: string | number | symbol) => void;
    readonly serviceProxyHandler: ObjectProxyHandler;
    /***
     * @param injector(name: string | number | symbol): any;
     * @param onGetMissingService?(msg: string, name: string | number | symbol): void;
     * @param propsFilter?(name: string): boolean;
     * @param onGetMissingProperty?(msg: string, ...args: any[]): void;
     * @param onSetMissingProperty?(msg: string, ...args: any[]): void;
     * @param onCallMissingMethod?(msg: string, ...args: any[]): void;
     */
    constructor({ injector, onGetMissingService }: IInjectorProxyHandlerOptions);
    get(target: {}, name: string | number | symbol): any;
    proxify(target?: any): any;
}
