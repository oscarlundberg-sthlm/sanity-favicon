import { createClient } from "next-sanity";
import { FaviconUpdaterConfig } from "../config";

export const getFaviconUrl = (sanityConfig: FaviconUpdaterConfig["sanity"]): Promise<string> => {
    const sanityClient = createClient(sanityConfig.clientConfig);

    return new Promise(async (resolve, reject) => {
        
        // If no locales, just use the query as-is
        if (!sanityConfig.locales || sanityConfig.locales.length === 0) {
            const faviconUrl = await sanityClient.fetch(sanityConfig.faviconUrlQuery());
            if (!faviconUrl) {
                reject('No favicon found');
            }
            resolve(faviconUrl);
            return;
        };

        const faviconUrlPromises = sanityConfig.locales.map(async (locale) => {
            return await sanityClient.fetch(sanityConfig.faviconUrlQuery(locale));
        });
    
        const faviconUrls = await Promise.all(faviconUrlPromises);

        const faviconUrl = faviconUrls.find((url) => !!url);
    
        if (!faviconUrl) {
            reject('No favicon found');
        }
        resolve(faviconUrl);
    });
};
