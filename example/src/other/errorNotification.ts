import i18next from '../translations';

const errorNotification = document.createElement('span');
const errorCode = '404';
errorNotification.innerHTML = i18next.t(`error.${errorCode}`);

export default errorNotification;
