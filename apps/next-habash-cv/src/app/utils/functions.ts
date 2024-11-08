export const truncate = (str: string, max: number) => {
    return str.length > max ? str.substring(0, (max-3)) + "..." : str;
}