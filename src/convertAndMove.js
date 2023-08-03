import * as dotenv from 'dotenv';
import { exec } from "node:child_process";

dotenv.config();

export default (
    inputImagePath, 
    { targetFolder }
) => {
    const target = 
        process.env.NODE_ENV === 'production' ? 
        '/favicon.ico' : 
        `${targetFolder}/favicon.ico`;

    return new Promise((resolve, reject) => {
        
        const childProcessCallback = (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            if (stderr) {
                reject(new Error(stderr));
            }
            resolve(stdout);
        };

        if (inputImagePath.endsWith('.ico')) {
            exec(
                `mv ${inputImagePath} ${target}`, 
                childProcessCallback
            );
        } else {
            exec(
                `magick convert ${inputImagePath} -background transparent -define icon:auto-resize=16,24,32,48,64,72,96,128,256 ${target} && rm ${inputImagePath}`, 
                childProcessCallback
            );
        }
        
    });
};