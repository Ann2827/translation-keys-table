import i18next from '../translations';
import errorNotification from '../other/errorNotification';

const help = document.createElement('div');

const title = document.createElement('h1');
title.innerHTML = i18next.t('help.title');

help.append(title);
help.append(errorNotification);

export default help;
