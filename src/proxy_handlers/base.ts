import {isNativeTypeCall} from "../generics";

export const PROXY_TAG = '__proxy__';

export function proxyFn(name: any = 'proxyFn') {
    const fn = function proxyFn() {};

    fn.__proxy_fn__ = name;

    return fn;
}

export function isProxyFn(subject: any) {
    return '__proxy_fn__' in subject;
}

export class BaseProxyHandler {
    has(target, key) {
        if (key === PROXY_TAG) {
            return true;
        }

        return key in target;
    }

    proxify(target: any = proxyFn(), name = null) {
        return name ? target[name] : target;
    }

    isProxified(target) {
        return (PROXY_TAG in target);
    }

    filter(target: any) {
        // Primitives
        if (!(target && target instanceof Object)) {
            return true;
        }

        // Filter native Types access (Map, Array, Date...)
        if (isNativeTypeCall(target)) {
            return true;
        }

        // Already proxified
        return this.isProxified(target);
    }
}
