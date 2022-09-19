import flatten from 'flat';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { createDirectories, readFile } from '../utils/file';
import { IFormatBase, TFlat, TFormatJson, TEditableJson } from '../types/format';
import { staticImplements } from '../types/decorators';

@staticImplements<IFormatBase<TFormatJson>>()
class JsonBase {
  /**
   * @method read - Read .json file
   * @param fileName {string}
   * @param encoding {BufferEncoding}
   * @return {TFormatJson | undefined}
   */
  public static read<K = TFormatJson>(fileName: string, encoding?: BufferEncoding): K | undefined {
    const file = readFile(fileName);
    // eslint-disable-next-line unicorn/text-encoding-identifier-case
    return file ? JSON.parse(file.toString(encoding ?? 'utf-8')) : undefined;
  }

  /**
   * @method write - Write object to file
   * @param {string} fileName - path + file name
   * @param {TFormatJson} data - JSON content
   * @param {number} spaces - JSON spaces
   * @return void
   */
  public static write<K = TFormatJson>(fileName: string, data: K, spaces?: number): void {
    createDirectories(fileName);
    fs.writeFileSync(
      path.join(process.cwd(), fileName),
      JSON.stringify(data, null, spaces ?? 2).replace(/\n/g, os.EOL) + os.EOL,
    );
  }

  /**
   * @method flatten - Convert properties file into flatten object.
   * @param data {TFormatJson}
   * @return TFlat
   */
  public static flatten<K = TFormatJson>(data: K): TFlat {
    return JsonBase.editable(data);
  }

  /**
   * @method unflatten - Convert flatten object file into json.
   * @param data {TFlat}
   * @return TFormatJson
   */
  public static unflatten<K = TFormatJson>(data: TFlat): K {
    return JsonBase.writable(data);
  }

  /**
   * @method editable - Convert json file to convenient for changes and saves comments.
   * @param data {TFormatJson}
   * @return TEditableJson
   */
  public static editable<K = TFormatJson, E = TEditableJson>(data: K): E {
    return flatten(data);
  }

  /**
   * @method writable - Convert editable format into json file.
   * @param data {TEditableJson}
   * @return TFormatJson
   */
  public static writable<K = TFormatJson, E = TEditableJson>(data: E): K {
    return flatten.unflatten(data);
  }

  /**
   * @method addItem - Work with editable format.
   * @param data {TEditableJson}
   * @param key {string}
   * @param value {string}
   * @return TEditableJson
   */
  public static addItem<E = TEditableJson>(data: E, key: string, value: string): E {
    return { ...data, [key]: value };
  }

  /**
   * @method deleteItem - Work with editable format.
   * @param data {TEditableJson}
   * @param key {string}
   * @return TEditableJson
   */
  public static deleteItem<E = TEditableJson>(data: E, key: string): E {
    delete (data as unknown as TEditableJson)[key];
    return { ...data };
  }

  /**
   * @method updateItem - Work with editable format. Update item value.
   * @param data {TEditableJson}
   * @param key {string}
   * @param value {string}
   * @return TEditableJson
   */
  public static updateItem<E = TEditableJson>(data: E, key: string, value: string): E {
    return { ...data, [key]: value };
  }
}

export default JsonBase;
