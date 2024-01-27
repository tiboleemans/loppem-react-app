import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';

const nl = require('./nl.json');
const fr = require('./fr.json');
const en = require('./en.json');

const changeLanguage = (language) => {
  // Don't reset the same language
  if (language && language === i18n.language) {
    return;
  }
  // This also sets the localStorage right for LanguageDetector
  i18n.changeLanguage(language).then(() => {
    // No harm in logging the language into the browser console
    // eslint-disable-next-line no-console
    console.info(`Language changed to ${language}`);
  });
};

const languageDetectorOptions = {
  // Querystring doesn't work well with react-router, so we don't use it
  order: ['localStorage', 'navigator'],
  lookupLocalStorage: 'language', // We could align this key with other products
  caches: ['localStorage']
};

const setupAndInitI18n = (language) => {
  const i18nOptions = {
    fallbackLng: ['en', 'fr', 'nl'],
    supportedLngs: ['nl', 'fr', 'en'],
    detection: languageDetectorOptions,
    resources: {
      'nl': {translations: nl},
      'fr': {translations: fr},
      'en': {translations: en}
    },
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
    // debug: true,
    interpolation: {
      escapeValue: false // Make sure to not escape characters by default (eg. DD//MM//YYYY, é&è)
    },
    // Have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',
    nsSeparator: '|', // Makes sure that the default value : can't be used in a translation
    react: {
      useSuspense: true,
      withRef: true,
      defaultTransParent: 'span'
    }
  };

  // Only set lng option when wanting to values for dedicated language (otherwise it will language detected from LanguageDetector)
  if (language) {
    i18nOptions.lng = language;
  }

  i18n
    .use(LanguageDetector) // Enables localStorage, browser language detection,
    .use(initReactI18next)
    .init(i18nOptions);
};

const getLanguage = () => {
  return i18n.language;
}

export {changeLanguage};
export {getLanguage};
export default setupAndInitI18n;
