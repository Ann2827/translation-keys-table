import { getProjectRoot } from './getProjectRoot';
import path from 'path';
import child_process from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
Object.entries<string>(require(path.join(getProjectRoot(), 'package.json')).bin).forEach(([, scriptPath]) =>
  child_process.execSync(`chmod +x ${scriptPath}`, {
    cwd: getProjectRoot(),
  }),
);
