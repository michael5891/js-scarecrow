export function angularFilter(propName: string) {
    return propName && propName.startsWith('$');
}
