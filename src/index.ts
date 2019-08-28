/**
 * This lib provides 3 layers of proxy decoration,
 * 1) services invocation by name, by the provided injector.
 * 2) provided service/object interface.
 * 3) Promise object.
 *
 * All layers are Proxy wrapped to avoid fatal exceptions on non existing misuse
 * or application out of sync in case of multi iframe shared services / resources.
 */
import {InjectorProxyHandler} from './proxy_handlers/injector';
import {InjectorProxyHandlerOptions} from "./proxy_handlers/object.interface";

export function InjectionProxy(options: InjectorProxyHandlerOptions): {} {
  return new Proxy({}, new InjectorProxyHandler(options));
}
