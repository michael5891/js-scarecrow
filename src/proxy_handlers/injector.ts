import { LoggingUtils, defaultLogger, devLog } from "../logging-utils";
import {BaseProxyHandler, proxyFn} from "./base";
import {ObjectProxyHandler} from "./object";
import {IInjectorProxyHandlerOptions, IObjectProxyHandlerOptions} from "./object.interface";

const { GetMissingServiceMsg } = LoggingUtils;

export class InjectorProxyHandler extends BaseProxyHandler {
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
    constructor({ injector, onGetMissingService = defaultLogger }: IInjectorProxyHandlerOptions) {
        super();
        this.injector = injector;
        this.onGetMissingService = onGetMissingService;
        this.serviceProxyHandler = new ObjectProxyHandler(arguments[0] as IObjectProxyHandlerOptions);
    }

    get(target: {}, name: string | number | symbol): any {
        devLog('[InjectorProxyHandler] Get', target, name);

        if (name === Symbol.toStringTag) return target.toString();

        if (name in target) return (<any>target)[name];

        let service = null;

        try {
            service = this.injector(name);
        } catch (err) {}

        if (!service) {
            this.onGetMissingService(GetMissingServiceMsg(name), name);
        }

        (<any>target)[name] = this.proxify(service || proxyFn(name));

        return (<any>target)[name];
    }

    proxify(target: any = proxyFn()) {
        return new Proxy(target, this.serviceProxyHandler);
    }
}
