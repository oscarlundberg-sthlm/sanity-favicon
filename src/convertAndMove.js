import { exec } from "node:child_process";

export default (
    inputImagePath, 
    { targetFolder }
) => {
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
                `mv ${inputImagePath} ${targetFolder}/favicon.ico`, 
                childProcessCallback
            );
        } else {
            exec(
                `magick convert ${inputImagePath} -background transparent -define icon:auto-resize=16,24,32,48,64,72,96,128,256 ${targetFolder}/favicon.ico && rm ${inputImagePath}`, 
                childProcessCallback
            );
        }
        
    });
};