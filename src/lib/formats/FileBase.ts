import { readFile } from '../utils/file';
import { findSubStrings } from '../utils/subStrings';

export type TFormatFile = string;

class FileBase {
  /**
   * @method read - Read file
   * @param fileName {string}
   * @return {TFormatFile | undefined}
   */
  public static read(fileName: string): TFormatFile | undefined {
    const file = readFile(fileName);
    // eslint-disable-next-line unicorn/text-encoding-identifier-case
    return file ? (file.toString('utf-8')) : undefined;
  }

  /**
   * @method readable - return array of strings
   * @param data {TFormatFile}
   * @return {TFormatFile[]}
   */
  public static readable(data: TFormatFile): TFormatFile[] {
    return data.split(/\n/);
  }

  public static find(file: TFormatFile, subStrings: string[]): string[] {
    const result: string[] = [];
    const array = FileBase.readable(file);
    array.forEach((string) => {
      const value = findSubStrings(string, subStrings);
      result.push(...value);
    });
    return result;
  }
}

export default FileBase;
