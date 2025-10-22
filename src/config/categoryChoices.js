import config from './env';

/**
 * Multi-API Kategori Konfigürasyonu
 * Farklı API sağlayıcılarını destekler: TMDB, Custom APIs
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
  POKEAPI: {
    name: 'PokeAPI',
    baseURL: 'https://pokeapi.co/api/v2',
    imageBaseURL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork',
    apiKey: null,
    headers: {},
    auth: 'none'
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
  POPULAR_FEMALE: ['popular_female', 'Popüler Aktiristler', 'Popüler Aktirist', '🌟👩‍🎭', '#FF1493', 'person', 'TMDB', '/person/popular', { }],
  POPULAR_MALE: ['popular_male', 'Popüler Aktörler', 'Popüler Aktör', '🌟👨‍🎭', '#1E90FF', 'person', 'TMDB', '/person/popular', { }],
  FEMALE: [1, 'Aktiristler', 'Aktirist', '👩‍🎭', '#FF6B9D', 'person', 'TMDB', '/discover/person', { with_gender: 1, sort_by: 'popularity.desc' }],
  MALE: [2, 'Aktörler', 'Aktör', '👨‍🎭', '#4DABF7', 'person', 'TMDB', '/discover/person', { with_gender: 2, sort_by: 'popularity.desc' }],
  MOVIES: ['movies', 'Filmler', 'Film', '🎬', '#FF8787', 'movie', 'TMDB', '/movie/popular', { sort_by: 'popularity.desc' }],
  POKEMON: ['pokemon', 'Pokemonlar', 'Pokemon', '⚡', '#FFCB05', 'pokemon', 'POKEAPI', '/pokemon', { limit: 100, offset: 0 }],
  DEFAULT: ['default', 'Tüm Ünlüler', 'Tümü', '⭐', '#FFA502', 'person', 'TMDB', '/person/popular', {}]
};

const getCategoryTranslationKey = (categoryKey) => {
  const keyMap = {
    'popular_female': 'popularFemale',
    'popular_male': 'popularMale',
    1: 'female',
    2: 'male',
    'movies': 'movies',
    'pokemon': 'pokemon',
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
  'POPULAR_FEMALE', 'POPULAR_MALE', 'FEMALE', 'MALE', 'MOVIES', 'POKEMON'
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
      'popular_female': 'POPULAR_FEMALE', 'popular_male': 'POPULAR_MALE',
      1: 'FEMALE', 2: 'MALE', 'movies': 'MOVIES', 'pokemon': 'POKEMON', 'default': 'DEFAULT'
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
