import { FaviconUpdaterConfig } from "../config";
import updateFavicon from './updateFavicon';

/**
 * @class FaviconUpdater
 * @description Create with config and then use .run() to update the favicon
 */
export class FaviconUpdater {
    config;
    #updateFavicon;
    async run() {
        try {
            return await this.#updateFavicon(this.config);
        } catch (error: any) {
            throw new Error(error);
        }
    };

    /**
     * 
     * @param {FaviconUpdaterConfig} config 
     */
    constructor(config: FaviconUpdaterConfig) {
        this.config = config;
        this.#updateFavicon = updateFavicon;
    }
}

module.exports = {
    FaviconUpdater
};