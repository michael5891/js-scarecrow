function strigify(element) {
  if (typeof element === 'symbol') return element.toString();

  if (element instanceof Object) return JSON.stringify(element);

  return element; // primitive
}

export class InjectorLoggingUtils {
  static GetMissingServicePropertyMsg = InjectorLoggingUtils.logTemplate('Getting non-existing property "{0}"');
  static SetMissingServicePropertyMsg = InjectorLoggingUtils.logTemplate(
      'Setting non-existing property "{0}", value: "{1}"',
  );
  static GetMissingServiceMsg = InjectorLoggingUtils.logTemplate('Getting non-existing service "{0}"');
  static CallMissingServiceMethodMsg = InjectorLoggingUtils.logTemplate(
      'Executing non-existing method: "{0}" on this: {1} with arguments: {2}',
  );

  static logTemplate(template: string) {
    return (...args: any[]) => {
      let result = template.slice(0); // clone

      args.forEach((arg, idx) => {
        // in case of symbol or proxy, primitive conversion will fail.
        result = result.split(`{${idx}}`).join(strigify(arg));
      });

      return result;
    };
  }
}
