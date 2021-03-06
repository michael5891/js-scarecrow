import { angularFilter } from "./angular.filter";
import { nativeQuirksFilter } from "./native-quirks.filter";

export { angularFilter };
export { nativeQuirksFilter };

export function defaultPropsFilter(propName: string) {
    return angularFilter(propName) || nativeQuirksFilter(propName);
}
