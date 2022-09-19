import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

function getProjectRootRec(dirPath: string): string {
  if (existsSync(path.join(dirPath, 'package.json'))) {
    return dirPath;
  }
  return getProjectRootRec(path.join(dirPath, '..'));
}

let result: string | undefined;

export function getProjectRoot(): string {
  if (result !== undefined) {
    return result;
  }

  return (result = getProjectRootRec(dirname));
}
