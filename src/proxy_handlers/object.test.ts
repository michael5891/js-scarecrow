/* eslint-disable max-lines */

import { LoggingUtils } from '../logging-utils';
import { ObjectProxyHandler } from './object';

const {
    GetMissingPropertyMsg,
    SetMissingPropertyMsg,
    CallMissingMethodMsg,
} = LoggingUtils;

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
        debugger
        console.log("WTF?");
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
    injector: dummyInjector.get,
    onGetMissingService: (...args: any[]) => Logger.logFatal(...args),
    onGetMissingProperty: (...args: any[]) => Logger.logWarn(...args),
    onSetMissingProperty: (...args: any[]) => Logger.logWarn(...args),
    onCallMissingMethod: (...args: any[]) => Logger.logFatal(...args),
};

describe('Object Proxy', () => {
    let logWarnSpy: any;
    let logFatalSpy: any;

    beforeAll(() => {
        logWarnSpy = spyOn(Logger, 'logWarn');
        logFatalSpy = spyOn(Logger, 'logFatal');
    });

    describe('ObjectProxyHandler', () => {
        let target: DummyService;
        let objectProxyHandler: ObjectProxyHandler;
        let serviceApi;

        describe('Proxy Getter', () => {
            beforeEach(() => {
                target = new DummyService();
                objectProxyHandler = new ObjectProxyHandler(injectorOptions);
                serviceApi = new Proxy(target, objectProxyHandler);
            });
            //
            // it('Get existing by prototype property', () => {
            //     expect(serviceApi[ExistingServiceBaseProperty]).toBe(ExistingServiceBasePropertyValue);
            // });
            //
            // it('Get existing property', () => {
            //     expect(serviceApi[ExistingServiceApi]()).toBe(target[ExistingServiceApi]());
            // });
            //
            // it('Get existing async property (Promise)', async () => {
            //     const actual = await serviceApi[ExistingServiceAsyncApi]();
            //     const expected = await target[ExistingServiceAsyncApi]();
            //
            //     expect(expected.id).toBe(actual.id);
            // });

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
                objectProxyHandler = new ObjectProxyHandler(injectorOptions);
                serviceApi = new Proxy(target, objectProxyHandler);
            });

            it('Set existing property', () => {
                const succeed = objectProxyHandler.set(target, ExistingServiceProperty, someValue);

                expect(succeed).toBeTruthy();
                expect((<any>target)[ExistingServiceProperty]).toBe(someValue);
            });

            it('Set none existing property', () => {
                const succeed = objectProxyHandler.set(target, NoneExistingServiceProperty, someValue);

                expect(succeed).toBeTruthy();
                expect((<any>target)[NoneExistingServiceProperty]).toBe(someValue);
            });

            it('Set existing filtered(angular) property', () => {
                const succeed = objectProxyHandler.set(target, ExistingServiceNgProperty, someValue);

                expect(succeed).toBeTruthy();
                expect((<any>target)[ExistingServiceNgProperty]).toBe(someValue);
            });

            it('Set non existing filtered(angular) property', () => {
                const succeed = objectProxyHandler.set(target, NoneExistingServiceNgProperty, someValue);

                expect(succeed).toBeTruthy();
                expect((<any>target)[NoneExistingServiceNgProperty]).toBe(someValue);
            });
        });

        describe('Proxy Method Call(Apply)', () => {
            beforeEach(() => {
                target = new DummyService();
                objectProxyHandler = new ObjectProxyHandler(injectorOptions);
                serviceApi = new Proxy(target, objectProxyHandler);
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
                objectProxyHandler = new ObjectProxyHandler(injectorOptions);
                serviceApi = new Proxy(target, objectProxyHandler);

                logWarnSpy.calls.reset();
                logFatalSpy.calls.reset();
            });

            it('Get: None existing service api', () => {
                objectProxyHandler.get(target, NoneExistingServiceApi);

                const expectedMsg = GetMissingPropertyMsg(NoneExistingServiceApi);

                expect(logWarnSpy).toHaveBeenCalledWith(expectedMsg, NoneExistingServiceApi);
            });

            it('Get: No logs for None existing filtered(angular) service api', () => {
                objectProxyHandler.get(target, NoneExistingServiceNgApi);
                expect(logWarnSpy).not.toHaveBeenCalled();
            });

            it('Set: None existing service property', () => {
                objectProxyHandler.set(target, NoneExistingServiceProperty, someValue);

                const expectedMsg = SetMissingPropertyMsg(NoneExistingServiceProperty, someValue);

                expect(logWarnSpy).toHaveBeenCalledWith(expectedMsg, NoneExistingServiceProperty, someValue);
            });

            it('Set: No logs for None existing filtered(angular) service property', () => {
                objectProxyHandler.set(target, NoneExistingServiceNgProperty, someValue);
                expect(logWarnSpy).not.toHaveBeenCalled();
            });

            it('Apply: logs for None existing service method', () => {
                serviceApi[NoneExistingServiceApi]();

                const targetStr = JSON.stringify(target);
                const expectedMsg = CallMissingMethodMsg(NoneExistingServiceApi, targetStr, []);

                expect(logFatalSpy).toHaveBeenCalledWith(expectedMsg, targetStr, []);
            });
        });
    });
});
