import Script from './core/Script';
import GoogleSheet from './core/GoogleSheet';

const script = new Script();
const data = script.main();

const googleSheet = new GoogleSheet(script.config, data);
googleSheet.main();
