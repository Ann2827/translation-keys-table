import i18n from 'i18next';
import ru from './ru.json';

// eslint-disable-next-line import/no-named-as-default-member
i18n
  .init({
    fallbackLng: 'ru',
    lng: 'ru',
    supportedLngs: ['ru'],
    resources: {
      ru: {
        translation: ru,
      },
    },
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export { default } from 'i18next';
