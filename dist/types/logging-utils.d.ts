/**
 * Enable in dev/monitor mode for debug,
 * consider feature flag support.
 * (dont commit while log enabled, unit test provided)
 */
export declare function devLog(msg: any, ...args: any[]): void;
export declare function defaultLogger(msg: any, ...args: any[]): void;
export declare function stringify(element: any): any;
export declare class LoggingUtils {
    static GetMissingPropertyMsg: (...args: any[]) => string;
    static SetMissingPropertyMsg: (...args: any[]) => string;
    static GetMissingServiceMsg: (...args: any[]) => string;
    static CallMissingMethodMsg: (...args: any[]) => string;
    static logTemplate(template: string): (...args: any[]) => string;
}
