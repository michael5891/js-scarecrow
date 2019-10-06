import { defaultPropsFilter } from "../filters";
import {isPromise, isPromiseNative, PromiseProxyHandler} from "./promise";
import {defaultLogger, devLog, LoggingUtils} from "../logging-utils";
import {BaseProxyHandler, isProxyFn, proxyFn} from "./base";
import {bindFn, bindSymbol, isNativeFunctionCall, isNativeTypeCall, isSymbol} from "../generics";
import {IObjectProxyHandlerOptions} from "./object.interface";

const {
    GetMissingPropertyMsg,
    SetMissingPropertyMsg,
    CallMissingMethodMsg,
} = LoggingUtils;

export class ObjectProxyHandler extends BaseProxyHandler {
    readonly propsFilter: (name: string | any) => boolean;

    readonly onGetMissingProperty: (msg: string, name: string) => void;

    readonly onSetMissingProperty: (msg: string, name: string, value: any) => void;

    readonly onCallMissingMethod: (msg: string, thisArg: any, args: any[]) => void;

    constructor({
                    propsFilter = defaultPropsFilter,
                    onGetMissingProperty = defaultLogger,
                    onSetMissingProperty = defaultLogger,
                    onCallMissingMethod = defaultLogger,
                }: IObjectProxyHandlerOptions = {}) {
        super();
        this.propsFilter = propsFilter;
        this.onGetMissingProperty = onGetMissingProperty;
        this.onSetMissingProperty = onSetMissingProperty;
        this.onCallMissingMethod = onCallMissingMethod;
    }

    get(target: {}, name: string | number | symbol, receiver: any = null): any {
        devLog('[ServiceProxyHandler] Get', name, typeof name);

        if (name === '__proxy_target__') {
            return target;
        }

        if (isSymbol(name)) {
            return bindSymbol(target, name);
        }

        if (this.propsFilter(name.toString()) || (name === 'then' && !isPromiseNative(target))) {
            return target[name];
        }

        if (name in target) {
            return this.proxify(target, name);
        }

        this.onGetMissingProperty(GetMissingPropertyMsg(name), name.toString());

        return this.proxify(proxyFn(name));
    }

    set(target: {}, name: string | number | symbol, value: any): boolean {
        devLog('[ServiceProxyHandler] Set', target, name, value);

        if (!(name in target || this.propsFilter(name.toString()))) {
            const msg = SetMissingPropertyMsg(name, value);

            this.onSetMissingProperty(msg, name.toString(), value);
        }

        (<any>target)[name] = value;

        return true;
    }

    apply(target: Function, thisArg: any, argsList: any[]): any {
        devLog('[ServiceProxyHandler] Apply', target, thisArg, argsList);

        if (isProxyFn(target)) {
            const thisArgStr = this.stringify(thisArg);
            // eslint-disable-next-line dot-notation
            const msg = CallMissingMethodMsg(target['__proxy_fn__'], thisArgStr, argsList);

            this.onCallMissingMethod(msg, thisArgStr, argsList);

            return this.proxify();
        }

        return this.proxify(target.apply(thisArg, argsList));
    }

    protected proxify(target: any = proxyFn(), name = null) {
        const subject = super.proxify(target, name);

        if (isPromise(subject)) {
            return new Proxy(subject, new PromiseProxyHandler());
        }

        if(this.filter(subject)) {
            return subject;
        }

        // Don't proxify native function calls (as fn.call, Promise.then...)
        if (isNativeFunctionCall(subject)) {
            return bindFn(target, name);
        }

        return new Proxy(subject, new ObjectProxyHandler());
    }

    protected stringify(target) {
        if (target && target.__proxy_target__) {
            return JSON.stringify(target.__proxy_target__) || target.__proxy_target__.toString();
        }
    }
}
