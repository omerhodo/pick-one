import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { DEFAULT_LANGUAGE, getLanguageConfig, isLanguageSupported, LANGUAGES } from './index';
import { createTranslationFunction, getPlural, getTranslation } from './utils';

// Storage key for language preference
const LANGUAGE_STORAGE_KEY = '@pick_one_language';

// Initial state
const initialState = {
  language: DEFAULT_LANGUAGE,
  isLoading: true,
  isReady: false,
};

// Action types
const ActionTypes = {
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_LOADING: 'SET_LOADING',
  SET_READY: 'SET_READY',
};

// Reducer
const i18nReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LANGUAGE:
      return { ...state, language: action.payload };
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ActionTypes.SET_READY:
      return { ...state, isReady: action.payload, isLoading: false };
    default:
      return state;
  }
};

// Context
const I18nContext = createContext();

/**
 * I18n Provider Component
 * Manages language state and provides translation functions
 */
export const I18nProvider = ({ children }) => {
  const [state, dispatch] = useReducer(i18nReducer, initialState);

  // Load saved language on app start
  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

        if (savedLanguage && isLanguageSupported(savedLanguage)) {
          dispatch({ type: ActionTypes.SET_LANGUAGE, payload: savedLanguage });
        }
      } catch (error) {
        console.warn('Failed to load saved language:', error);
      } finally {
        dispatch({ type: ActionTypes.SET_READY, payload: true });
      }
    };

    loadSavedLanguage();
  }, []);

  // Change language and save to storage
  const changeLanguage = async (newLanguage) => {
    if (!isLanguageSupported(newLanguage)) {
      console.warn('Unsupported language:', newLanguage);
      return false;
    }

    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });

      // Save to AsyncStorage
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);

      // Update state
      dispatch({ type: ActionTypes.SET_LANGUAGE, payload: newLanguage });

      return true;
    } catch (error) {
      console.error('Failed to change language:', error);
      return false;
    } finally {
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    }
  };

  // Toggle between Turkish and English
  const toggleLanguage = async () => {
    const newLanguage = state.language === LANGUAGES.TR ? LANGUAGES.EN : LANGUAGES.TR;
    return await changeLanguage(newLanguage);
  };

  // Get current language config
  const getCurrentLanguageConfig = () => {
    return getLanguageConfig(state.language);
  };

  // Create translation function for current language
  const t = createTranslationFunction(state.language);

  // Plural translation function
  const tp = (key, count, params = {}) => {
    return getPlural(key, count, state.language, params);
  };

  // Translation with explicit language
  const tl = (key, language, params = {}, fallback = null) => {
    return getTranslation(key, language, params, fallback);
  };

  const value = {
    // State
    language: state.language,
    isLoading: state.isLoading,
    isReady: state.isReady,
    languageConfig: getCurrentLanguageConfig(),

    // Actions
    changeLanguage,
    toggleLanguage,

    // Translation functions
    t,    // Main translation function
    tp,   // Plural translation function
    tl,   // Translation with explicit language

    // Utils
    getCurrentLanguageConfig,
    isLanguageSupported,
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

/**
 * useI18n Hook
 * Provides access to translation functions and language state
 */
export const useI18n = () => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }

  return context;
};

/**
 * useTranslation Hook
 * Returns only the translation function (lighter hook for components that only need translations)
 */
export const useTranslation = () => {
  const { t, tp, tl } = useI18n();
  return { t, tp, tl };
};

/**
 * withTranslation HOC
 * Higher-order component that injects translation functions as props
 */
export const withTranslation = (Component) => {
  const WrappedComponent = (props) => {
    const { t, tp, tl } = useTranslation();

    return (
      <Component
        {...props}
        t={t}
        tp={tp}
        tl={tl}
      />
    );
  };

  WrappedComponent.displayName = `withTranslation(${Component.displayName || Component.name})`;

  return WrappedComponent;
};
