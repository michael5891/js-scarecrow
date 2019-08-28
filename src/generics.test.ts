import { angularFilter } from "./filters";
import { isNativeCodeProperty } from "./generics";

describe('generics', () => {
    describe('isNativeCodeProperty', () => {
        it('Filter native code calls as fn.call', () => {
            [Date.now, Array.from, Object.assign, Promise.resolve].forEach(subject => {
                expect(isNativeCodeProperty(subject)).toBeTruthy();
            });

            // eslint-disable-next-line dot-notation
            Date['customOverride'] = function() {};

            // eslint-disable-next-line dot-notation
            [it, angularFilter, Date['customOverride']].forEach(subject => {
                expect(isNativeCodeProperty(subject)).toBeFalsy();
            });
        });
    });
});
