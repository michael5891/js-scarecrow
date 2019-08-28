/**
 * Ignore native code as fn.call or native object flows as Map.forEach
 */
export function isNativeCodeProperty(subject: { toString }) {
  if (!subject) return false;

  return isNativeFunctionCall(subject) || isNativeTypeCall(subject);
}

export function isNativeFunctionCall(subject: { toString }) {
  if (!subject) return false;

  return isFunction(subject) && /\[native code]/.test(subject.toString());
}

export function isNativeTypeCall(subject: { toString }) {
  if (!subject) return false;

  return !isFunction(subject) && Boolean(subject[Symbol.toStringTag]);
}

export function isFunction(subject) {
  return typeof subject === 'function';
}

export function isSymbol(item) {
  return typeof item === 'symbol';
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

  return bindFn(target, prop);
}

