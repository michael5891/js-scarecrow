/* eslint-disable max-lines */
import {
  isAngularProperty,
  isNativeCodeProperty,
  InjectorProxyHandler,
  ServiceProxyHandler,
  proxify,
  injectorProxy,
} from './injector-proxy';

import { InjectorLoggingUtils } from './injector-logging-utils';

const {
  GetMissingServiceMsg,
  GetMissingServicePropertyMsg,
  SetMissingServicePropertyMsg,
  CallMissingServiceMethodMsg,
} = InjectorLoggingUtils;

const someValue = { someVal: 'someVal' };
const poked = 'poked';
const ExistingServiceName = 'ExistingServiceName';
const NoneExistingServiceName = 'NoneExistingServiceName';

const ExistingServiceBaseProperty = 'baseProperty';
const ExistingServiceBasePropertyValue = 'basePoke';
const ExistingServiceBaseMethod = 'baseMethod';

const ExistingServiceProperty = 'someProperty';
const NoneExistingServiceProperty = 'someProperty2';

const ExistingServiceNgProperty = '$someProperty';
const NoneExistingServiceNgProperty = '$someProperty2';

const ExistingServiceApi = 'poke';
const ExistingServiceAsyncApi = 'async_poke';
const ExistingServiceAsyncPolyApi = 'async_poly_poke';
const ExistingServiceNativeTypeApi = 'native_type_poke';
const NoneExistingServiceApi = 'poke2';

const ExistingServiceNgApi = '$poke';
const NoneExistingServiceNgApi = '$poke2';

class BaseService {
  baseProperty = ExistingServiceBasePropertyValue;

  someMap = new Map();

  constructor() {
    this.someMap.set('key', 'value');
  }

  baseMethod(arg = '') {
    return arg + this.baseProperty;
  }
}

class DummyService extends BaseService {
  id = Date.now();

  [ExistingServiceProperty] = '1';

  [ExistingServiceNgProperty] = '2';

  [ExistingServiceApi] = function(arg = '') {
    return arg + poked;
  };

  [ExistingServiceAsyncApi] = async function(arg = '') {
    return Promise.resolve(dummyService);
  };

  [ExistingServiceNativeTypeApi] = async function(arg = '') {
    return this.someMap.has('key');
  };

  [ExistingServiceNgApi] = function(arg = '') {
    return arg + poked;
  };
}

const dummyService = new DummyService();
const dummyInjector = {
  get: (serviceName: string) => (serviceName === ExistingServiceName ? dummyService : null),
  youShellNotPass: () => {
    throw new Error('En taro adun!');
  },
};

const Logger = {
  logWarn: (...args: any[]) => console.log(...args),
  logFatal: (...args: any[]) => console.log(...args),
};

const injectorOptions = {
  proxifyPromise: true,
  injector: dummyInjector.get,
  onGetMissingService: (...args: any[]) => Logger.logFatal(...args),
  onGetMissingServiceProperty: (...args: any[]) => Logger.logWarn(...args),
  onSetMissingServiceProperty: (...args: any[]) => Logger.logWarn(...args),
  onCallMissingServiceMethod: (...args: any[]) => Logger.logFatal(...args),
};

describe('Injector Proxy', () => {
  let logWarnSpy: any;
  let logFatalSpy: any;

  beforeAll(() => {
    /* eslint-disable no-undef */
    logWarnSpy = spyOn(Logger, 'logWarn');
    /* eslint-disable no-undef */
    logFatalSpy = spyOn(Logger, 'logFatal');
  });

  describe('logTemplate', () => {
    it('Symbol properties', () => {
      const primitive = 'propName';
      const symbol = Symbol('dummySymbol');

      const msgTemplate = InjectorLoggingUtils.logTemplate('firstParam: {0} symbol: {1}');
      const result = msgTemplate(primitive, symbol);

      expect(result).toBe(`firstParam: ${primitive} symbol: Symbol(dummySymbol)`);
    });

    it('String template indexed replacement', () => {
      const primitive = 'propName';
      const symbol = Symbol('dummySymbol');

      const msgTemplate = InjectorLoggingUtils.logTemplate('firstParam: {0} {1} symbol: {1} {0}');
      const result = msgTemplate(primitive, symbol);

      expect(result).toBe(`firstParam: ${primitive} Symbol(dummySymbol) symbol: Symbol(dummySymbol) ${primitive}`);
    });
  });

  describe('isNativeCodeProperty', () => {
    it('Filter native code calls as fn.call', () => {
      [Date.now, Array.from, Object.assign, Promise.resolve].forEach(subject => {
        expect(isNativeCodeProperty(subject)).toBeTruthy();
      });

      // eslint-disable-next-line dot-notation
      Date['customOverride'] = function() {};

      // eslint-disable-next-line dot-notation
      [it, isAngularProperty, Date['customOverride']].forEach(subject => {
        expect(isNativeCodeProperty(subject)).toBeFalsy();
      });
    });
  });

  describe('isAngularProperty', () => {
    it('Filter angular properties $', () => {
      ['$scope', '$model', '$$hashKey'].forEach(key => {
        expect(isAngularProperty(key)).toBeTruthy();
      });
      ['scope', 'model', 'hashKey'].forEach(key => {
        expect(isAngularProperty(key)).toBeFalsy();
      });
    });
  });

  describe('InjectorProxyHandler', () => {
    let injectorProxyHandler: InjectorProxyHandler;
    let injectorProxyService;

    beforeEach(() => {
      injectorProxyHandler = new InjectorProxyHandler(injectorOptions);
      injectorProxyService = injectorProxy(injectorOptions);
    });

    // Remove when relevant feature flag / approach embedded.
    it('No dev logs', () => {
      const logSpy = spyOn(console, 'log');
      injectorProxyHandler.get({}, ExistingServiceName);
      expect(logSpy).not.toHaveBeenCalled();
    });

    it('Resolve service by name', () => {
      const service = injectorProxyService[ExistingServiceName];

      expect(service.poke()).toBe(poked);
      expect(service.poke('a')).toBe(`a${poked}`);
    });

    it('Resolve service by name', () => {
      const service = injectorProxyService[ExistingServiceName];

      expect(service.poke()).toBe(poked);
      expect(service.poke('a')).toBe(`a${poked}`);
    });

    it('Log calls for none existing service name', () => {
      injectorProxyService[NoneExistingServiceName];

      const expectedMsg = GetMissingServiceMsg(NoneExistingServiceName);

      expect(logFatalSpy).toHaveBeenCalledWith(expectedMsg, NoneExistingServiceName);
      logFatalSpy.calls.reset();
    });

    it('Exec none existing service as function', () => {
      injectorProxyService[NoneExistingServiceName]();
    });

    it('Log calls injector crash', () => {
      injectorProxyService[NoneExistingServiceName];

      const expectedMsg = GetMissingServiceMsg(NoneExistingServiceName);

      expect(logFatalSpy).toHaveBeenCalledWith(expectedMsg, NoneExistingServiceName);
      logFatalSpy.calls.reset();
    });

    it('Provide shared single instance of the injected service', () => {
      const injectorProxyHandler2 = new InjectorProxyHandler(injectorOptions);
      const service1 = injectorProxyHandler.get({}, ExistingServiceName);

      service1[ExistingServiceProperty] = 'service1';

      const service2 = injectorProxyHandler2.get({}, ExistingServiceName);

      service2[ExistingServiceProperty] = 'service2';

      expect(service1[ExistingServiceProperty]).toBe('service2');
    });
  });

  describe('ServiceProxyHandler', () => {
    let target: DummyService;
    let serviceProxyHandler: ServiceProxyHandler;
    let serviceApi;

    describe('Proxy Getter', () => {
      beforeEach(() => {
        target = new DummyService();
        serviceProxyHandler = new ServiceProxyHandler(injectorOptions);
        serviceApi = proxify(serviceProxyHandler, target);
      });

      it('Get existing by prototype property', () => {
        expect(serviceApi[ExistingServiceBaseProperty]).toBe(ExistingServiceBasePropertyValue);
      });

      it('Get existing property', () => {
        expect(serviceApi[ExistingServiceApi]()).toBe(target[ExistingServiceApi]());
      });

      it('Get existing async property (Promise)', async () => {
        const actual = await serviceApi[ExistingServiceAsyncApi]();
        const expected = await target[ExistingServiceAsyncApi]();

        expect(expected.id).toBe(actual.id);
      });

      it('Get existing async property (Promise) with none existing property invocation', async () => {
        const proxifiedResponse = await serviceApi[ExistingServiceAsyncApi]();

        expect(proxifiedResponse[NoneExistingServiceApi]).toBeDefined();
      });

      it('Chained Promises flow', async () =>
          serviceApi[ExistingServiceAsyncApi]()
              .then(proxifiedResponse1 => {
                expect(proxifiedResponse1[NoneExistingServiceApi]).toBeDefined();

                return proxifiedResponse1;
              })
              .then(proxifiedResponse2 => {
                expect(proxifiedResponse2[NoneExistingServiceApi]).toBeDefined();

                return proxifiedResponse2;
              })
              .then(proxifiedResponse3 => {
                expect(proxifiedResponse3[NoneExistingServiceApi]).toBeDefined();

                return proxifiedResponse3;
              }));

      it.skip('Promise polyfill', () => {});

      it('Get none existing property', () => {
        expect(serviceApi[NoneExistingServiceApi]).toBeDefined();
      });

      it('Get existing filtered(angular) property', () => {
        expect(serviceApi[ExistingServiceNgApi]).toBeDefined();
      });

      it('Get non existing filtered(angular) property', () => {
        expect(serviceApi[NoneExistingServiceNgApi]).toBeUndefined();
      });

      it('Get none existing toStringTag by native toStringCall (edge case)', () => {
        expect(Symbol.toStringTag in Object(serviceApi)).toBe(false);

        // Will call by Symbol.toStringTag though the symbol does not exist.
        expect(Object.prototype.toString.call(serviceApi)).toBe('[object Object]');
      });

      it('Ignore constructor access', () => {
        expect(serviceApi.constructor.__proxy_target__).toBe(undefined);
      });

      it('Ignore toJSON access', () => {
        // Dont create proxy
        expect(serviceApi.toJSON).toBe(undefined);

        // If exist fall through
        // eslint-disable-next-line dot-notation
        target['toJSON'] = () => {};

        const toJsonSpy = spyOn(serviceApi, 'toJSON');

        console.log(JSON.stringify(serviceApi));
        expect(toJsonSpy).toHaveBeenCalled();
      });
    });

    describe('Proxy Setter', () => {
      beforeEach(() => {
        target = new DummyService();
        serviceProxyHandler = new ServiceProxyHandler(injectorOptions);
        serviceApi = proxify(serviceProxyHandler, target);
      });

      it('Set existing property', () => {
        const succeed = serviceProxyHandler.set(target, ExistingServiceProperty, someValue);

        expect(succeed).toBeTruthy();
        expect((<any>target)[ExistingServiceProperty]).toBe(someValue);
      });

      it('Set none existing property', () => {
        const succeed = serviceProxyHandler.set(target, NoneExistingServiceProperty, someValue);

        expect(succeed).toBeTruthy();
        expect((<any>target)[NoneExistingServiceProperty]).toBe(someValue);
      });

      it('Set existing filtered(angular) property', () => {
        const succeed = serviceProxyHandler.set(target, ExistingServiceNgProperty, someValue);

        expect(succeed).toBeTruthy();
        expect((<any>target)[ExistingServiceNgProperty]).toBe(someValue);
      });

      it('Set non existing filtered(angular) property', () => {
        const succeed = serviceProxyHandler.set(target, NoneExistingServiceNgProperty, someValue);

        expect(succeed).toBeTruthy();
        expect((<any>target)[NoneExistingServiceNgProperty]).toBe(someValue);
      });
    });

    describe('Proxy Method Call(Apply)', () => {
      beforeEach(() => {
        target = new DummyService();
        serviceProxyHandler = new ServiceProxyHandler(injectorOptions);
        serviceApi = proxify(serviceProxyHandler, target);
      });

      it('Apply existing base method', () => {
        expect(serviceApi[ExistingServiceBaseMethod]()).toBe(ExistingServiceBasePropertyValue);
      });

      it('Apply existing method', () => {
        expect(serviceApi[ExistingServiceApi]()).toBe(poked);
      });

      it('Apply existing method with arguments', () => {
        expect(serviceApi[ExistingServiceApi](someValue)).toBe(someValue + poked);
      });

      it('Apply none existing method', () => {
        expect(serviceApi.poke2()).toBeTruthy();
      });

      it('Apply existing filtered(angular) method', () => {
        expect(serviceApi[ExistingServiceNgApi](someValue)).toBe(someValue + poked);
      });

      it('Apply non existing filtered(angular) method', () => {
        expect(() => serviceApi[NoneExistingServiceNgApi]()).toThrow(TypeError);
      });
    });

    describe('Log calls for none existing api/property', () => {
      beforeEach(() => {
        target = new DummyService();
        serviceProxyHandler = new ServiceProxyHandler(injectorOptions);
        serviceApi = proxify(serviceProxyHandler, target);

        logWarnSpy.calls.reset();
        logFatalSpy.calls.reset();
      });

      it('Get: None existing service api', () => {
        serviceProxyHandler.get(target, NoneExistingServiceApi);

        const expectedMsg = GetMissingServicePropertyMsg(NoneExistingServiceApi);

        expect(logWarnSpy).toHaveBeenCalledWith(expectedMsg, NoneExistingServiceApi);
      });

      it('Get: No logs for None existing filtered(angular) service api', () => {
        serviceProxyHandler.get(target, NoneExistingServiceNgApi);
        expect(logWarnSpy).not.toHaveBeenCalled();
      });

      it('Set: None existing service property', () => {
        serviceProxyHandler.set(target, NoneExistingServiceProperty, someValue);

        const expectedMsg = SetMissingServicePropertyMsg(NoneExistingServiceProperty, someValue);

        expect(logWarnSpy).toHaveBeenCalledWith(expectedMsg, NoneExistingServiceProperty, someValue);
      });

      it('Set: No logs for None existing filtered(angular) service property', () => {
        serviceProxyHandler.set(target, NoneExistingServiceNgProperty, someValue);
        expect(logWarnSpy).not.toHaveBeenCalled();
      });

      it('Apply: logs for None existing service method', () => {
        serviceApi[NoneExistingServiceApi]();

        const targetStr = JSON.stringify(target);
        const expectedMsg = CallMissingServiceMethodMsg(NoneExistingServiceApi, targetStr, []);

        expect(logFatalSpy).toHaveBeenCalledWith(expectedMsg, targetStr, []);
      });
    });
  });
});
