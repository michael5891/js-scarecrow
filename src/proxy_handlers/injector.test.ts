/* eslint-disable max-lines */

import { LoggingUtils } from '../logging-utils';
import { InjectorProxyHandler } from "./injector";

const {
    GetMissingServiceMsg,
    CallMissingMethodMsg,
} = LoggingUtils;

const poked = 'poked';
const ExistingServiceName = 'ExistingServiceName';
const NoneExistingServiceName = 'NoneExistingServiceName';

const ExistingServiceBasePropertyValue = 'basePoke';

const ExistingServiceProperty = 'someProperty';

const ExistingServiceNgProperty = '$someProperty';

const ExistingServiceApi = 'poke';
const ExistingServiceAsyncApi = 'async_poke';
const ExistingServiceNativeTypeApi = 'native_type_poke';

const ExistingServiceNgApi = '$poke';

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

const Logger = {
    logWarn: (...args: any[]) => console.log(...args),
    logFatal: (...args: any[]) => console.log(...args),
};

const dummyService = new DummyService();
const injectorOptions = {
    injector: (serviceName: string) => (serviceName === ExistingServiceName ? dummyService : null),
    onGetMissingService: (...args: any[]) => Logger.logFatal(...args)
};

describe('Injector Proxy', () => {
    let logWarnSpy: any;
    let logFatalSpy: any;

    beforeAll(() => {
        logWarnSpy = spyOn(Logger, 'logWarn');
        logFatalSpy = spyOn(Logger, 'logFatal');
    });

    describe('InjectorProxyHandler', () => {
        let injectorProxyHandler: InjectorProxyHandler;
        let injectorProxyService;

        beforeEach(() => {
            injectorProxyHandler = new InjectorProxyHandler(injectorOptions);
            injectorProxyService = new Proxy({}, injectorProxyHandler);
        });

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
});
