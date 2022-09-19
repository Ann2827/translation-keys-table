import { TConfig } from '../types/config';
import { staticImplements } from '../types/decorators';
import { TData } from '../types/data';

const gapi = require('gapi');

interface IGoogleSheet {
  new (config: TConfig, data: TData): {
    readonly config: TConfig;
    readonly data: TData;
    main(): void;
  };
}

@staticImplements<IGoogleSheet>()
class GoogleSheet {
  public readonly config: TConfig;
  public readonly data: TData;

  constructor(config: TConfig, data: TData) {
    this.config = config;
    this.data = data;
  }

  main() {
    const CLIENT_ID = '639471978213-sgk0e5rk0uuplftvm6ljucm2m5phapkq.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyBHHMUOXX26a8CkZJhH8sIjPtlI2cggmCE';
    const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
    const SCOPES = "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file";

    gapi.server.setApiKey(API_KEY);
    gapi.server.load('sheets','v4',function(){

    });
  }
}

export default GoogleSheet;
