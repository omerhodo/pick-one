import config from './env';

/**
 * Multi-API Kategori Konfigürasyonu
 * Farklı API sağlayıcılarını destekler: TMDB, API Ninjas, Custom APIs
 * Compact ve esnek yapı ile tüm kategori bilgilerini yönetir
 */

// API Base Configurations
export const API_PROVIDERS = {
  TMDB: {
    name: 'The Movie Database',
    baseURL: config.TMDB_BASE_URL,
    imageBaseURL: config.TMDB_IMAGE_BASE_URL,
    apiKey: config.TMDB_API_KEY,
    headers: {},
    auth: 'query', // 'query' | 'header' | 'bearer'
    keyParam: 'api_key'
  },
  NINJAS: {
    name: 'API Ninjas',
    baseURL: 'https://api.api-ninjas.com/v1',
    apiKey: config.API_NINJAS_KEY,
    headers: { 'X-Api-Key': config.API_NINJAS_KEY },
    auth: 'header'
  },
  CUSTOM: {
    name: 'Custom API',
    baseURL: 'https://api.example.com/v1',
    apiKey: null,
    headers: {},
    auth: 'none'
  }
};

// Compact Categories Configuration
// Format: [key, name, shortName, icon, color, type, provider, endpoint, params]
export const CATEGORIES = {
  FEMALE: [1, 'Aktiristler', 'Aktirist', '👩‍🎭', '#FF6B9D', 'person', 'TMDB', '/discover/person', { with_gender: 1, sort_by: 'popularity.desc' }],
  MALE: [2, 'Aktörler', 'Aktör', '👨‍🎭', '#4DABF7', 'person', 'TMDB', '/discover/person', { with_gender: 2, sort_by: 'popularity.desc' }],
  MOVIES: ['movies', 'Filmler', 'Film', '🎬', '#FF8787', 'movie', 'TMDB', '/movie/popular', { sort_by: 'popularity.desc' }],
  CELEBRITIES_NINJAS: ['celebrities', 'Ünlü Kişiler', 'Ünlü', '🌟', '#FFA502', 'person', 'NINJAS', '/celebrity', { category: 'actor' }],
  DEFAULT: ['default', 'Tüm Ünlüler', 'Tümü', '⭐', '#FFA502', 'person', 'TMDB', '/person/popular', {}]
};

const getCategoryTranslationKey = (categoryKey) => {
  const keyMap = {
    1: 'female',
    2: 'male',
    'movies': 'movies',
    'celebrities': 'celebrities',
    'default': 'all'
  };
  return keyMap[categoryKey] || 'all';
};

const expandCategory = (compactData) => {
  const [key, name, shortName, icon, color, type, provider, endpoint, params] = compactData;
  return {
    key, name, shortName, displayName: name, icon,
    emoji: icon, color, type, provider,
    api: { provider, endpoint, params }
  };
};

export const HOMEPAGE_CATEGORIES = [
  'FEMALE', 'MALE', 'MOVIES'
].map(key => expandCategory(CATEGORIES[key]));

export class CategoryAPI {
  static getConfig(categoryKey) {
    const normalizedKey = this.normalizeKey(categoryKey);
    const compactData = CATEGORIES[normalizedKey] || CATEGORIES.DEFAULT;
    return expandCategory(compactData);
  }

  static getFullURL(categoryKey) {
    const category = this.getConfig(categoryKey);
    const provider = API_PROVIDERS[category.provider];
    return `${provider.baseURL}${category.api.endpoint}`;
  }

  static getParams(categoryKey) {
    const category = this.getConfig(categoryKey);
    const provider = API_PROVIDERS[category.provider];
    let params = { ...category.api.params };

    if (provider.auth === 'query' && provider.apiKey) {
      params[provider.keyParam || 'api_key'] = provider.apiKey;
    }

    return params;
  }

  static getHeaders(categoryKey) {
    const category = this.getConfig(categoryKey);
    const provider = API_PROVIDERS[category.provider];
    return { ...provider.headers };
  }

  static getProvider(categoryKey) {
    const category = this.getConfig(categoryKey);
    return API_PROVIDERS[category.provider];
  }

  static getImageBaseURL(categoryKey) {
    const provider = this.getProvider(categoryKey);
    return provider.imageBaseURL || '';
  }

  static normalizeKey(key) {
    const keyMap = {
      1: 'FEMALE', 2: 'MALE', 'actors': 'ACTORS', 'musicians': 'MUSICIANS',
      'writers': 'WRITERS', 'movies': 'MOVIES', 'celebrities': 'CELEBRITIES_NINJAS',
      'default': 'DEFAULT'
    };
    return keyMap[key] || 'DEFAULT';
  }

  static getByProvider(providerName) {
    return Object.keys(CATEGORIES)
      .map(key => expandCategory(CATEGORIES[key]))
      .filter(cat => cat.provider === providerName);
  }

  static getByType(type) {
    return Object.keys(CATEGORIES)
      .map(key => expandCategory(CATEGORIES[key]))
      .filter(cat => cat.type === type);
  }

  static getFetchConfig(categoryKey) {
    const headers = this.getHeaders(categoryKey);
    const provider = this.getProvider(categoryKey);

    let config = { headers };

    if (provider.auth === 'bearer' && provider.apiKey) {
      config.headers.Authorization = `Bearer ${provider.apiKey}`;
    }

    return config;
  }

  static getColor(categoryKey) {
    const category = this.getConfig(categoryKey);
    return category.color;
  }

  static getEmoji(categoryKey) {
    const category = this.getConfig(categoryKey);
    return category.emoji;
  }

  static getAllNames() {
    return Object.keys(CATEGORIES).map(key => expandCategory(CATEGORIES[key]).name);
  }
}

export const UI = {
  getHomepageOptions: (t) => [
    {
      value: null,
      label: t ? t('categories.all') : 'Tüm Ünlüler',
      description: t ? t('categories.allDescription') : 'Tüm ünlüler',
      icon: '⭐'
    },
    ...HOMEPAGE_CATEGORIES.map(category => ({
      value: category.key,
      label: t ? t(`categories.${getCategoryTranslationKey(category.key)}`) : category.displayName,
      description: t ? t(`categories.${getCategoryTranslationKey(category.key)}Description`) : category.name,
      icon: category.icon,
      color: category.color,
      emoji: category.emoji,
      provider: category.provider
    }))
  ],

  getSimpleList: () => Object.keys(CATEGORIES).map(key => {
    const cat = expandCategory(CATEGORIES[key]);
    return { key: cat.key, name: cat.name, icon: cat.icon };
  }),

  getColorMap: () => Object.keys(CATEGORIES).reduce((acc, key) => {
    const cat = expandCategory(CATEGORIES[key]);
    acc[cat.key] = cat.color;
    return acc;
  }, {}),

  getProviderList: () => Object.keys(API_PROVIDERS).map(key => ({
    key,
    name: API_PROVIDERS[key].name,
    baseURL: API_PROVIDERS[key].baseURL
  }))
};

export default CATEGORIES;
export { CategoryAPI as API };
