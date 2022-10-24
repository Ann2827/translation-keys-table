import JsonBase from '../formats/JsonBase';
import { TConfig } from '../types/config';
import { staticImplements } from '../types/decorators';
import { TData } from '../types/data';
import { readdirSync, readFileSync, statSync } from 'fs';
import path from 'path';
import glob from 'glob';
import { readFile } from '../utils/file';
import FileBase, { TFormatFile } from '../formats/FileBase';

const CONFIG_NAME = 'translation-keys.config.json'

interface IScript {
  new (): {
    readonly config: TConfig;
    main(): TData;
  };
}

@staticImplements<IScript>()
class Script {
  public readonly config: TConfig;

  constructor() {
    this.config = this._readConfig();
  }

  protected _readConfig() {
    const config = JsonBase.read<TConfig>(CONFIG_NAME);
    if (!config) {
      throw new Error(`You need add ${CONFIG_NAME} into project root`);
    }
    return config;
  }

  public main() {
    console.log('patterns', this.config.readDirsPattern);
    this.config.readDirsPattern.forEach((pattern) => {
      glob(pattern, (error, files)=> {
        if(error){
          console.log('error', error)
        }

        files.forEach((file) => {
          const f = FileBase.read(file);
          if (f) {
            const keys: string[] = FileBase.find(f, this.config.subStrings);
            const [name] = FileBase.find(f, ['// translation-keys: *']);
            console.log('finded:', file, name, keys);
          }
        })
      });


      // const stats = statSync(path.join(process.cwd(), elementPath), { throwIfNoEntry: false });
      // if (!stats) {
      //   throw new Error(`No element ${elementPath}`);
      // }
      //
      // readdirSync(path.join(process.cwd(), pattern)).forEach((name) => {
      //   console.log('name', name);
      // })
    });
    return {};
  }
}

export default Script;
