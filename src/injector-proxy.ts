/* eslint-disable max-lines */
/**
 * InjectorProxy provides 3 layers of proxy decoration,
 * first layer is for the services invocation by name, of the provided injector.
 * second layer is for the provided service interface.
 * third layer is for the Promise object.
 *
 * All layers are Proxy wrapped to avoid fatal exceptions on non existing misuse
 * or application out of sync with the container services version.
 */
import { InjectorProxyHandlerOptions, ServiceProxyHandlerOptions } from './injector-proxy.interface';
import { InjectorLoggingUtils } from './injector-logging-utils';

// Remove once promise proxify is confirmed for prod
let __proxifyPromise__ = true;

const {
  GetMissingServiceMsg,
  GetMissingServicePropertyMsg,
  SetMissingServicePropertyMsg,
  CallMissingServiceMethodMsg,
} = InjectorLoggingUtils;

function defaultLogger(msg: any, ...args: any[]) {
  console.error('[InjectorProxy] ', msg, ...args);
}

/**
 * Enable in dev/monitor mode for debug,
 * consider feature flag support.
 * (dont commit while log enabled, unit test provided)
 */
function devLog(msg: any, ...args: any[]) {
  // console.log('[InjectorProxy] ', msg, ...args);
}

export function proxyFn(name: any = 'proxyFn') {
  const fn = function proxyFn() {};

  fn.__proxy_fn__ = name;

  return fn;
}

export function isProxyFn(subject: any) {
  return '__proxy_fn__' in subject;
}

export function proxyStringify(target) {
  if (target && target.__proxy_target__) {
    return JSON.stringify(target.__proxy_target__) || target.__proxy_target__.toString();
  }
}

/**
 * Ignore native code as fn.call or native object flows as Map.forEach
 */
export function isNativeCodeProperty(subject: { toString }) {
  if (!subject) return false;

  return isNativeFunctionCall(subject) || isNativeTypeCall(subject);
}

export function isNativeFunctionCall(subject: { toString }) {
  if (!subject) return false;

  return isFunction(subject) && /\[native code]/.test(subject.toString());
}

export function isNativeTypeCall(subject: { toString }) {
  if (!subject) return false;

  return !isFunction(subject) && Boolean(subject[Symbol.toStringTag]);
}

/**
 * Ignore irrelevant behavior, such as angular dynamic properties enrichment.
 */
export function defaultPropsFilter(subject: string) {
  return isAngularProperty(subject) || nativeQuirks(subject);
}

export function nativeQuirks(subject: string) {
  // toJSON called by json stringify as api for custom override.
  // constructor is been used in some edge cases we don't need here
  return subject === 'toJSON' || subject === 'constructor';
}

export function isAngularProperty(subject: string) {
  return subject && subject.startsWith('$');
}

export function isPromise(obj) {
  return isPromiseNative(obj) || isPromisePolyfill(obj);
}

/**
 * None es6 promise polyfill as bluebird will have a simple 'then' function.
 */
export function isPromisePolyfill(obj) {
  return obj && typeof obj.then === 'function';
}

/**
 * Native es6
 */
export function isPromiseNative(obj) {
  return obj instanceof Promise;
}

function isFunction(subject) {
  return typeof subject === 'function';
}

function isSymbol(item) {
  return typeof item === 'symbol';
}

function bindFn(target, prop) {
  if (!(isFunction(target[prop]) || isSymbol(prop))) throw new Error(`None function binding: ${arguments}`);

  return target[prop].bind(target);
}

function bindSymbol(target, prop) {
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * Object.prototype.toString in es5 will call by Symbol.toStringTag, must make sure target has it or use function.
   */
  if (prop === Symbol.toStringTag) {
    return target[Symbol.toStringTag] ? bindFn(target, prop) : bindFn(target, 'toString');
  }

  return bindFn(target, prop);
}

export function proxify(handler, target: any = proxyFn(), name = null) {
  const subject = name ? target[name] : target;

  // Ignore Primitive or already proxified
  if (!subject || !(subject instanceof Object) || '__proxy__' in subject) {
    return subject;
  }

  if (isPromise(subject)) {
    return __proxifyPromise__ ? new Proxy(subject, new PromiseProxyHandler(handler)) : subject;
  }

  // Don't proxify native Types access (Map, Array, Date...)
  if (isNativeTypeCall(subject)) {
    return subject;
  }

  // Don't proxify native function calls (as fn.call, Promise.then...)
  if (isNativeFunctionCall(subject)) {
    return bindFn(target, name);
  }

  return new Proxy(subject, handler);
}

export class ProxyHandler {
  has(target, key) {
    if (key === '__proxy__') {
      return true;
    }

    return key in target;
  }
}

export class PromiseProxyHandler extends ProxyHandler {
  constructor(private responseProxyHandler) {
    super();
  }

  get(target, prop) {
    let scope = target;
    const value = target[prop];

    if (prop === 'then') {
      scope = target.then(response => proxify(this.responseProxyHandler, response));
    }

    return typeof value === 'function' ? bindFn(scope, prop) : value;
  }
}

export class ServiceProxyHandler extends ProxyHandler {
  readonly propsFilter: (name: string | any) => boolean;

  readonly onGetMissingServiceProperty: (msg: string, name: string) => void;

  readonly onSetMissingServiceProperty: (msg: string, name: string, value: any) => void;

  readonly onCallMissingServiceMethod: (msg: string, thisArg: any, args: any[]) => void;

  constructor({
                proxifyPromise = true,
                propsFilter = defaultPropsFilter,
                onGetMissingServiceProperty = defaultLogger,
                onSetMissingServiceProperty = defaultLogger,
                onCallMissingServiceMethod = defaultLogger,
              }: ServiceProxyHandlerOptions = {}) {
    super();
    __proxifyPromise__ = proxifyPromise;
    this.propsFilter = propsFilter;
    this.onGetMissingServiceProperty = onGetMissingServiceProperty;
    this.onSetMissingServiceProperty = onSetMissingServiceProperty;
    this.onCallMissingServiceMethod = onCallMissingServiceMethod;
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
      return proxify(this, target, name);
    }

    this.onGetMissingServiceProperty(GetMissingServicePropertyMsg(name), name.toString());

    return proxify(this, proxyFn(name));
  }

  set(target: {}, name: string | number | symbol, value: any): boolean {
    devLog('[ServiceProxyHandler] Set', target, name, value);

    if (!(name in target || this.propsFilter(name.toString()))) {
      const msg = SetMissingServicePropertyMsg(name, value);

      this.onSetMissingServiceProperty(msg, name.toString(), value);
    }

    (<any>target)[name] = value;

    return true;
  }

  apply(target: Function, thisArg: any, argsList: any[]): any {
    devLog('[ServiceProxyHandler] Apply', target, thisArg, argsList);

    if (isProxyFn(target)) {
      const thisArgStr = proxyStringify(thisArg);
      // eslint-disable-next-line dot-notation
      const msg = CallMissingServiceMethodMsg(target['__proxy_fn__'], thisArgStr, argsList);

      this.onCallMissingServiceMethod(msg, thisArgStr, argsList);

      return proxify(this);
    }

    return proxify(this, target.apply(thisArg, argsList));
  }
}

export class InjectorProxyHandler extends ProxyHandler {
  readonly injector: (name: string | number | symbol) => any;

  readonly onGetMissingService: (msg: string, name: string | number | symbol) => void;

  readonly serviceProxyHandler: ServiceProxyHandler;

  constructor({ injector, onGetMissingService = defaultLogger }: InjectorProxyHandlerOptions) {
    super();
    this.injector = injector;
    this.onGetMissingService = onGetMissingService;
    this.serviceProxyHandler = new ServiceProxyHandler(arguments[0] as ServiceProxyHandlerOptions);
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

    (<any>target)[name] = proxify(this.serviceProxyHandler, service || proxyFn(name));

    return (<any>target)[name];
  }
}

export function injectorProxy(options: InjectorProxyHandlerOptions): {} {
  return proxify(new InjectorProxyHandler(options));
}
