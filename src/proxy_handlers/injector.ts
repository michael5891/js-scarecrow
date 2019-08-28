import { LoggingUtils, defaultLogger, devLog } from "../logging-utils";
import {BaseProxyHandler, proxyFn} from "./base";
import {ObjectProxyHandler} from "./object";
import {InjectorProxyHandlerOptions, ObjectProxyHandlerOptions} from "./object.interface";

const { GetMissingServiceMsg } = LoggingUtils;

export class InjectorProxyHandler extends BaseProxyHandler {
    readonly injector: (name: string | number | symbol) => any;

    readonly onGetMissingService: (msg: string, name: string | number | symbol) => void;

    readonly serviceProxyHandler: ObjectProxyHandler;

    constructor({ injector, onGetMissingService = defaultLogger }: InjectorProxyHandlerOptions) {
        super();
        this.injector = injector;
        this.onGetMissingService = onGetMissingService;
        this.serviceProxyHandler = new ObjectProxyHandler(arguments[0] as ObjectProxyHandlerOptions);
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
