import { ExecException, exec } from "node:child_process";

interface ConvertAndMoveConfig {
    targetFolder: string;
}

export default (
    inputImagePath: string, 
    { targetFolder }: ConvertAndMoveConfig
) => {
    return new Promise((resolve, reject) => {
        
        const childProcessCallback = (error: ExecException|null, stdout: string, stderr: string) => {
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