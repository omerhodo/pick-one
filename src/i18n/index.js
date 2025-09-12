import en from './languages/en';
import tr from './languages/tr';

export const LANGUAGES = {
  TR: 'tr',
  EN: 'en'
};

export const LANGUAGE_CONFIG = {
  [LANGUAGES.TR]: {
    code: 'tr',
    name: 'Türkçe',
    flag: '🇹🇷',
    native: 'Türkçe',
    rtl: false
  },
  [LANGUAGES.EN]: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    native: 'English',
    rtl: false
  }
};

export const TRANSLATIONS = {
  [LANGUAGES.TR]: tr,
  [LANGUAGES.EN]: en
};

export const DEFAULT_LANGUAGE = LANGUAGES.TR;

export const getAvailableLanguages = () => {
  return Object.values(LANGUAGE_CONFIG);
};

export const getLanguageConfig = (langCode) => {
  return LANGUAGE_CONFIG[langCode] || LANGUAGE_CONFIG[DEFAULT_LANGUAGE];
};

export const isLanguageSupported = (langCode) => {
  return Object.keys(LANGUAGE_CONFIG).includes(langCode);
};
