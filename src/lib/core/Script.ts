import JsonBase from '../formats/JsonBase';
import { TConfig } from '../types/config';
import { staticImplements } from '../types/decorators';
import { TData } from '../types/data';

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
    this.config.readDirsPattern.forEach((pattern) => {

    });
    return {};
  }
}

export default Script;
