import i18next from '../translations';

const main = document.createElement('div');

const title = document.createElement('h1');
title.innerHTML = i18next.t('main.title');

const description = document.createElement('p');
description.innerHTML = i18next.t('main.description');

main.append(title);
main.append(description);

export default main;
