/**
 * Enable in dev/monitor mode for debug,
 * consider feature flag support.
 * (dont commit while log enabled, unit test provided)
 */
export function devLog(msg, ...args) {
    // console.log('[ScarecrowProxy] ', msg, ...args);
}
export function defaultLogger(msg, ...args) {
    console.error('[ScarecrowProxy] ', msg, ...args);
}
export function stringify(element) {
    if (typeof element === 'symbol')
        return element.toString();
    if (element instanceof Object)
        return JSON.stringify(element);
    return element; // primitive
}
export class LoggingUtils {
    static logTemplate(template) {
        return (...args) => {
            let result = template.slice(0); // clone
            args.forEach((arg, idx) => {
                // in case of symbol or proxy, primitive conversion will fail.
                result = result.split(`{${idx}}`).join(stringify(arg));
            });
            return result;
        };
    }
}
LoggingUtils.GetMissingPropertyMsg = LoggingUtils.logTemplate('Getting non-existing property "{0}"');
LoggingUtils.SetMissingPropertyMsg = LoggingUtils.logTemplate('Setting non-existing property "{0}", value: "{1}"');
LoggingUtils.GetMissingServiceMsg = LoggingUtils.logTemplate('Getting non-existing service "{0}"');
LoggingUtils.CallMissingMethodMsg = LoggingUtils.logTemplate('Executing non-existing method: "{0}" on this: {1} with arguments: {2}');
//# sourceMappingURL=logging-utils.js.map