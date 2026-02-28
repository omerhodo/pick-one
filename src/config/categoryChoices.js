import config from './env';

/**
 * Multi-API Kategori Konfigürasyonu
 * Farklı API sağlayıcılarını destekler: TMDB, PokeAPI, Jikan
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

  JIKAN: {
    name: 'Jikan (MyAnimeList)',
    baseURL: 'https://api.jikan.moe/v4',
    imageBaseURL: '',
    apiKey: null,
    headers: {},
    auth: 'none'
  }
};

// Compact Categories Configuration
// Format: [key, name, shortName, icon, color, type, provider, endpoint, params]
export const CATEGORIES = {
  POPULAR_MOVIES: ['popular_movies', 'Popüler Filmler', 'Popüler Film', '🔥', '#FF8787', 'movie', 'TMDB', '/movie/popular', { sort_by: 'popularity.desc' }],
  TOP_RATED_MOVIES: ['top_rated_movies', 'En Beğenilen Filmler', 'En Beğenilen', '⭐', '#FFD700', 'movie', 'TMDB', '/movie/top_rated', {}],
  ACTION_MOVIES: ['action_movies', 'Aksiyon Filmleri', 'Aksiyon', '💥', '#FF4500', 'movie', 'TMDB', '/discover/movie', { with_genres: 28, sort_by: 'popularity.desc' }],
  COMEDY_MOVIES: ['comedy_movies', 'Komedi Filmleri', 'Komedi', '😂', '#32CD32', 'movie', 'TMDB', '/discover/movie', { with_genres: 35, sort_by: 'popularity.desc' }],
  ANIMATION_MOVIES: ['animation_movies', 'Animasyon Filmleri', 'Animasyon', '🎨', '#9370DB', 'movie', 'TMDB', '/discover/movie', { with_genres: 16, sort_by: 'popularity.desc' }],
  POKEMON: ['pokemon', 'Pokemonlar', 'Pokemon', '⚡', '#FFCB05', 'pokemon', 'POKEAPI', '/pokemon', { limit: 100, offset: 0 }],

  ANIME: ['anime', 'Top Anime', 'Anime', '🎌', '#E91E63', 'anime', 'JIKAN', '/top/anime', { limit: 25 }],
  DEFAULT: ['default', 'Popüler Filmler', 'Filmler', '🎬', '#FFA502', 'movie', 'TMDB', '/movie/popular', {}]
};

const getCategoryTranslationKey = (categoryKey) => {
  const keyMap = {
    'popular_movies': 'popularMovies',
    'top_rated_movies': 'topRatedMovies',
    'action_movies': 'actionMovies',
    'comedy_movies': 'comedyMovies',
    'animation_movies': 'animationMovies',
    'pokemon': 'pokemon',

    'anime': 'anime',
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
  'POPULAR_MOVIES', 'TOP_RATED_MOVIES', 'ACTION_MOVIES', 'COMEDY_MOVIES', 'ANIMATION_MOVIES', 'POKEMON', 'ANIME'
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
      'popular_movies': 'POPULAR_MOVIES', 'top_rated_movies': 'TOP_RATED_MOVIES',
      'action_movies': 'ACTION_MOVIES', 'comedy_movies': 'COMEDY_MOVIES',
      'animation_movies': 'ANIMATION_MOVIES', 'pokemon': 'POKEMON',
      'anime': 'ANIME', 'default': 'DEFAULT'
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
      label: t ? t('categories.all') : 'Tüm Kategoriler',
      description: t ? t('categories.allDescription') : 'Popüler filmler',
      icon: '🎬'
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
