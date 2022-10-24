import { mkdirSync, existsSync, readFileSync } from 'fs';
import path from 'path';

/**
 * src/locales/ru/translation.json -> src/locales/ru
 * @param filePath {string}
 */
const getFolderPath = (filePath: string): string => {
  const parts: string[] = filePath.split('/');
  if (parts[parts.length - 1].includes('.')) {
    return parts.slice(0, -1).join('/');
  }
  return filePath;
};

/**
 * Check and create directories if they don't exist
 * @param elementPath {string}
 */
export const createDirectories = (elementPath: string): void => {
  const folder: string = getFolderPath(elementPath);
  const stats = existsSync(path.join(process.cwd(), folder));
  if (!stats) {
    mkdirSync(path.join(process.cwd(), folder), { recursive: true });
  }
};

/**
 * @function readFile - Read file
 * @param fileName
 */
export const readFile = (fileName: string): Buffer | undefined => {
  try {
    return readFileSync(path.join(process.cwd(), fileName));
    // eslint-disable-next-line no-empty
  } catch {}
};
