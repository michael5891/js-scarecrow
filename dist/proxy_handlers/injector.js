import { LoggingUtils, defaultLogger, devLog } from "../logging-utils";
import { BaseProxyHandler, proxyFn } from "./base";
import { ObjectProxyHandler } from "./object";
const { GetMissingServiceMsg } = LoggingUtils;
export class InjectorProxyHandler extends BaseProxyHandler {
    /***
     * @param injector(name: string | number | symbol): any;
     * @param onGetMissingService?(msg: string, name: string | number | symbol): void;
     * @param propsFilter?(name: string): boolean;
     * @param onGetMissingProperty?(msg: string, ...args: any[]): void;
     * @param onSetMissingProperty?(msg: string, ...args: any[]): void;
     * @param onCallMissingMethod?(msg: string, ...args: any[]): void;
     */
    constructor({ injector, onGetMissingService = defaultLogger }) {
        super();
        this.injector = injector;
        this.onGetMissingService = onGetMissingService;
        this.serviceProxyHandler = new ObjectProxyHandler(arguments[0]);
    }
    get(target, name) {
        devLog('[InjectorProxyHandler] Get', target, name);
        if (name === Symbol.toStringTag)
            return target.toString();
        if (name in target)
            return target[name];
        let service = null;
        try {
            service = this.injector(name);
        }
        catch (err) { }
        if (!service) {
            this.onGetMissingService(GetMissingServiceMsg(name), name);
        }
        target[name] = this.proxify(service || proxyFn(name));
        return target[name];
    }
    proxify(target = proxyFn()) {
        return new Proxy(target, this.serviceProxyHandler);
    }
}
//# sourceMappingURL=injector.js.map