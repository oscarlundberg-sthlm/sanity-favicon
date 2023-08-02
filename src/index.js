import { FaviconUpdaterConfig } from "../config.ts";
import updateFavicon from './updateFavicon.js';

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
        } catch (error) {
            throw new Error(error);
        }
    };

    /**
     * 
     * @param {FaviconUpdaterConfig} config 
     */
    constructor(config) {
        this.config = config;
        this.#updateFavicon = updateFavicon;
    }
}

module.exports = {
    FaviconUpdater
};