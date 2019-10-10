export function nativeQuirksFilter(propName) {
    // - toJSON called by json stringify as api for custom override.
    // - constructor is been used in some js packages (edge cases)
    return propName === 'toJSON' || propName === 'constructor';
}
//# sourceMappingURL=native-quirks.filter.js.map