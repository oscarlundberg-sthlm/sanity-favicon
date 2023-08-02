interface DownloadConfig {
    folder: string;
}
declare const _default: (url: string, { folder }: DownloadConfig) => Promise<string>;
export default _default;
