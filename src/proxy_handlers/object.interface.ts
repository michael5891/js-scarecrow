export interface IObjectProxyHandlerOptions {
  propsFilter?(name: string): boolean;
  onGetMissingProperty?(msg: string, ...args: any[]): void;
  onSetMissingProperty?(msg: string, ...args: any[]): void;
  onCallMissingMethod?(msg: string, ...args: any[]): void;
}

export interface IInjectorProxyHandlerOptions extends IObjectProxyHandlerOptions {
  injector(name: string | number | symbol): any;
  onGetMissingService?(msg: string, name: string | number | symbol): void;
}
