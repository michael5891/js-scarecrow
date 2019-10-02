/**
 * Ignore native code as fn.call or native object flows as Map.forEach
 */
export function isNativeCodeProperty(value: { toString }) {
  if (!value) return false;

  return isNativeFunctionCall(value) || isNativeTypeCall(value);
}

export function isNativeFunctionCall(value: { toString }) {
  if (!value) return false;

  return isFunction(value) && /\[native code]/.test(value.toString());
}

export function isNativeTypeCall(value: { toString }) {
  if (!value) return false;

  return !isFunction(value) && Boolean(value[Symbol.toStringTag]);
}

export function isFunction(value) {
  return typeof value === 'function';
}

export function isSymbol(value) {
  return typeof value === 'symbol';
}

export function bindFn(target, prop) {
  if (!(isFunction(target[prop]) || isSymbol(prop))) throw new Error(`None function binding: ${arguments}`);

  return target[prop].bind(target);
}

export function bindSymbol(target, prop) {
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * Object.prototype.toString in es5 will call by Symbol.toStringTag, must make sure target has it or use function.
   */
  if (prop === Symbol.toStringTag) {
    return target[Symbol.toStringTag] ? bindFn(target, prop) : bindFn(target, 'toString');
  }

  // Encountered in tests mode by jest.
  if (Symbol.keyFor(prop) === 'nodejs.util.inspect.custom') {
    return; // the symbol doesnt exist on the target
  }

  return bindFn(target, prop);
}

