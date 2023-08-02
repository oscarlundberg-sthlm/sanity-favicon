// @ts-nocheck
import convertAndMove from "./convertAndMove.mjs";
import download from "./download.mjs";
import { getFaviconUrl } from "./sanity.mjs";

export default async (config) => {
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
    } catch (error) {
        throw new Error(error);
    }
};
