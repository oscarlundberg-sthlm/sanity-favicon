import * as fs from 'node:fs/promises';

interface DownloadConfig {
    folder: string;
}

export default async (
    url: string, 
    { folder }: DownloadConfig
) => {    
    try {
        const response = await fetch(url);

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.startsWith('image')) {
            throw new Error('Favicon fetch - content-type: ' + contentType + ' is not an image');
        }

        const data = await response.blob();

        const fileExtension = {
            'image/png': '.png',
            'image/svg+xml': '.svg',
            'image/jpeg': '.jpg',
            'image/webp': '.webp',
            'image/x-icon': '.ico',
            'image/vnd.microsoft.icon': '.ico',
        }[data.type];

        if (!fileExtension) {
            throw new Error('Favicon fetch - file extension not supported');
        }

        const fileBuffer = new Uint8Array(await data.arrayBuffer());

        const customPath = `${folder}/temporaryFaviconDownloadBeforeConversion${fileExtension}`;
        await fs.writeFile(customPath, fileBuffer);
        return customPath;
    } catch (error: any) {
        throw new Error(error);
    }   
};
