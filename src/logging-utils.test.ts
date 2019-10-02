import { LoggingUtils } from './logging-utils';

const {
    GetMissingServiceMsg,
    GetMissingPropertyMsg,
    SetMissingPropertyMsg,
    CallMissingMethodMsg,
} = LoggingUtils;

const Logger = {
    logWarn: (...args: any[]) => console.log(...args),
    logFatal: (...args: any[]) => console.log(...args),
};

describe('Logging utils', () => {
    let logWarnSpy: any;
    let logFatalSpy: any;

    beforeAll(() => {
        logWarnSpy = spyOn(Logger, 'logWarn');
        logFatalSpy = spyOn(Logger, 'logFatal');
    });

    describe('logTemplate', () => {
        it('Symbol properties', () => {
            const primitive = 'propName';
            const symbol = Symbol('dummySymbol');

            const msgTemplate = LoggingUtils.logTemplate('firstParam: {0} symbol: {1}');
            const result = msgTemplate(primitive, symbol);

            expect(result).toBe(`firstParam: ${primitive} symbol: Symbol(dummySymbol)`);
        });

        it('String template indexed replacement', () => {
            const primitive = 'propName';
            const symbol = Symbol('dummySymbol');

            const msgTemplate = LoggingUtils.logTemplate('firstParam: {0} {1} symbol: {1} {0}');
            const result = msgTemplate(primitive, symbol);

            expect(result).toBe(`firstParam: ${primitive} Symbol(dummySymbol) symbol: Symbol(dummySymbol) ${primitive}`);
        });
    });
});
