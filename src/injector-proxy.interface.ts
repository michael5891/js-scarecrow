export interface ServiceProxyHandlerOptions {
  proxifyPromise?: boolean;
  propsFilter?(name: string): boolean;
  onGetMissingServiceProperty?(msg: string): void;
  onSetMissingServiceProperty?(msg: string): void;
  onCallMissingServiceMethod?(msg: string): void;
}

export interface InjectorProxyHandlerOptions extends ServiceProxyHandlerOptions {
  injector(name: string | number | symbol): any;
  onGetMissingService?(msg: string, name: string | number | symbol): void;
}
