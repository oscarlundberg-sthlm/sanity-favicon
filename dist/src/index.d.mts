import { FaviconUpdaterConfig } from "../config.ts";
/**
 * @class FaviconUpdater
 * @description Create with config and then use .run() to update the favicon
 */
export declare class FaviconUpdater {
    #private;
    config: FaviconUpdaterConfig;
    run(): Promise<boolean>;
    /**
     *
     * @param {FaviconUpdaterConfig} config
     */
    constructor(config: FaviconUpdaterConfig);
}
