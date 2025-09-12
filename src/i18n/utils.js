/**
 * i18n Utility Functions
 * Provides translation functions and string interpolation
 */

import { DEFAULT_LANGUAGE, TRANSLATIONS } from './index';

/**
 * Get nested object value by path
 * @param {Object} obj - Object to traverse
 * @param {string} path - Dot notation path (e.g., 'home.title')
 * @param {*} fallback - Fallback value if path not found
 */
export const getNestedValue = (obj, path, fallback = null) => {
  return path.split('.').reduce((current, key) => {
    return current?.[key] !== undefined ? current[key] : fallback;
  }, obj);
};

/**
 * Simple string interpolation
 * Replaces {key} placeholders with values from params object
 * @param {string} template - Template string with {key} placeholders
 * @param {Object} params - Object with replacement values
 */
export const interpolateString = (template, params = {}) => {
  if (typeof template !== 'string') return template;

  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return params[key] !== undefined ? params[key] : match;
  });
};

/**
 * Get translation for a key
 * @param {string} key - Translation key in dot notation
 * @param {string} language - Language code
 * @param {Object} params - Parameters for string interpolation
 * @param {string} fallback - Fallback text if translation not found
 */
export const getTranslation = (key, language = DEFAULT_LANGUAGE, params = {}, fallback = null) => {
  const languageTranslations = TRANSLATIONS[language] || TRANSLATIONS[DEFAULT_LANGUAGE];

  const translation = getNestedValue(languageTranslations, key, fallback || key);

  return interpolateString(translation, params);
};

/**
 * Create a translation function bound to a specific language
 * @param {string} language - Language code to bind to
 */
export const createTranslationFunction = (language) => {
  return (key, params = {}, fallback = null) => {
    return getTranslation(key, language, params, fallback);
  };
};

/**
 * Get plural form of a translation
 * Simple English/Turkish plural logic
 * @param {string} key - Translation key
 * @param {number} count - Count to determine plural
 * @param {string} language - Language code
 * @param {Object} params - Parameters for interpolation (count is automatically added)
 */
export const getPlural = (key, count, language = DEFAULT_LANGUAGE, params = {}) => {
  const pluralKey = count === 1 ? `${key}.singular` : `${key}.plural`;
  const fallbackKey = key; // Use base key as fallback

  const finalParams = { ...params, count };

  return getTranslation(pluralKey, language, finalParams,
    getTranslation(fallbackKey, language, finalParams)
  );
};

/**
 * Format date according to language locale
 * @param {Date|string} date - Date to format
 * @param {string} language - Language code
 * @param {Object} options - Intl.DateTimeFormat options
 */
export const formatDate = (date, language = DEFAULT_LANGUAGE, options = {}) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (!(dateObj instanceof Date) || isNaN(dateObj)) {
    return date;
  }

  const locale = language === 'tr' ? 'tr-TR' : 'en-US';

  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(dateObj);
};

/**
 * Format number according to language locale
 * @param {number} number - Number to format
 * @param {string} language - Language code
 * @param {Object} options - Intl.NumberFormat options
 */
export const formatNumber = (number, language = DEFAULT_LANGUAGE, options = {}) => {
  const locale = language === 'tr' ? 'tr-TR' : 'en-US';

  return new Intl.NumberFormat(locale, options).format(number);
};

/**
 * Get direction for language (ltr/rtl)
 * @param {string} language - Language code
 */
export const getLanguageDirection = (language) => {
  // Add RTL languages here if needed
  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  return rtlLanguages.includes(language) ? 'rtl' : 'ltr';
};

/**
 * Validate translation key exists
 * @param {string} key - Translation key to validate
 * @param {string} language - Language code
 */
export const hasTranslation = (key, language = DEFAULT_LANGUAGE) => {
  const languageTranslations = TRANSLATIONS[language] || TRANSLATIONS[DEFAULT_LANGUAGE];
  const value = getNestedValue(languageTranslations, key);
  return value !== null && value !== undefined;
};

/**
 * Get all translation keys for debugging
 * @param {string} language - Language code
 * @param {string} prefix - Key prefix filter
 */
export const getTranslationKeys = (language = DEFAULT_LANGUAGE, prefix = '') => {
  const languageTranslations = TRANSLATIONS[language] || TRANSLATIONS[DEFAULT_LANGUAGE];

  const extractKeys = (obj, currentPath = '') => {
    let keys = [];

    Object.keys(obj).forEach(key => {
      const newPath = currentPath ? `${currentPath}.${key}` : key;

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        keys = keys.concat(extractKeys(obj[key], newPath));
      } else {
        keys.push(newPath);
      }
    });

    return keys;
  };

  const allKeys = extractKeys(languageTranslations);

  return prefix
    ? allKeys.filter(key => key.startsWith(prefix))
    : allKeys;
};
