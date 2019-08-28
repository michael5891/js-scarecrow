import { angularFilter } from "./angular.filter";

describe('angularFilter', () => {
    it('Filter angular properties $', () => {
        ['$scope', '$model', '$$hashKey'].forEach(key => {
            expect(angularFilter(key)).toBeTruthy();
        });
        ['scope', 'model', 'hashKey'].forEach(key => {
            expect(angularFilter(key)).toBeFalsy();
        });
    });
});
