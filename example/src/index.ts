import mainPage from './pages/main';
import helpPage from './pages/help';

const root = document.querySelector('#root');

const elMain = document.createElement('div');
elMain.outerHTML = mainPage;

const elHelp = document.createElement('div')
elHelp.outerHTML = helpPage;

if (root) {
  root.append(elMain);
  root.append(elHelp);
}
