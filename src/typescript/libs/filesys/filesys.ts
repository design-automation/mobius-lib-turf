import * as fs from "fs";

/**
 * Read a file.
 */
export function readFromJSONFile(filename: string): string {
    const contents: string = fs.readFileSync(filename).toString();
    return contents;
}
