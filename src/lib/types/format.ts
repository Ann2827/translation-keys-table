export enum EFormat {
  json = 'json',
}

export type TFormatJson = Record<string, unknown> | Record<string, unknown>[];
export type TFormats = TFormatJson;
export type TFlat = Record<string, string>;
export type TEditableJson = Record<string, string>;
export type TEditable = TEditableJson;

export interface IFormatBase<T = TFormats, W = TEditable> {
  // new (): {};
  read<K = T>(fileName: string, ...props: any): K | undefined;
  write<K = T>(fileName: string, data: K, ...props: any): void;
  flatten<K = T>(data: K): TFlat;
  unflatten<K = T>(data: TFlat): K;
  editable<K = T, E = W>(data: K): E;
  writable<K = T, E = W>(data: E): K;
  addItem<E = W>(data: E, key: string, value: string): E;
  deleteItem<E = W>(data: E, key: string): E;
  updateItem<E = W>(data: E, key: string, value: string): E;
}

export interface IFormat<T = TFormats> extends IFormatBase<T> {
  // new (): {};
  downloadTranslationFile<K = T>(token: string, masterFileId: number, locale: string): Promise<K>;
  addAbsentKeys<K = T>(
    sourceFile: K,
    translationFile: K,
    toAddKeys: string[],
    toDeleteKeys: string[],
    toAddText: string[],
  ): K;
}
