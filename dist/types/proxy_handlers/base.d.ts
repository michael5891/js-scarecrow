export declare const PROXY_TAG = "__proxy__";
export declare function proxyFn(name?: any): () => void;
export declare function isProxyFn(subject: any): boolean;
export declare class BaseProxyHandler {
    has(target: any, key: any): boolean;
    protected proxify(target?: any, name?: any): any;
    isProxified(target: any): boolean;
    filter(target: any): boolean;
}
