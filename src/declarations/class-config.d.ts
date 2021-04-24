declare function setConfig(config: {
    [key: string]: unknown;
}): string;
declare function getConfig(id: string): {
    [key: string]: unknown;
};
export { setConfig, getConfig };
