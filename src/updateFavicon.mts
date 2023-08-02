import { FaviconUpdaterConfig } from "../config.ts";
import convertAndMove from "./convertAndMove.mts";
import download from "./download.mts";
import { getFaviconUrl } from "./sanity.mts";

export default async (config: FaviconUpdaterConfig) => {
    try {
        // Get the favicon URL from Sanity
        const faviconUrl = await getFaviconUrl(config.sanity);
        
        // Attempt to download the favicon from the URL
        const pathToDownloadedFile = await download(faviconUrl, {
            folder: config.publicFolder
        });
    
        if (!pathToDownloadedFile) {
            throw new Error('Favicon download failed');
        }

        // Convert it to favicon.ico
        // Move it into the public folder
        await convertAndMove(pathToDownloadedFile, {
            targetFolder: config.publicFolder,
        });

        return true;
    } catch (error: any) {
        throw new Error(error);
    }
};
