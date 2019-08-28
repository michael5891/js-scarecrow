export function nativeQuirksFilter(propName: string) {
    // - toJSON called by json stringify as api for custom override.
    // - constructor is been used in some js packages (edge cases)
    return propName === 'toJSON' || propName === 'constructor';
}
