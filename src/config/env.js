import Constants from 'expo-constants';

// Environment variables configuration
const config = {
  // TMDB API Configuration
  TMDB_API_KEY: process.env.TMDB_API_KEY || Constants.expoConfig?.extra?.tmdbApiKey || 'demo_key',
  TMDB_READ_ACCESS_TOKEN: process.env.TMDB_READ_ACCESS_TOKEN || Constants.expoConfig?.extra?.tmdbReadAccessToken || null,
  TMDB_BASE_URL: 'https://api.themoviedb.org/3',
  TMDB_IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500',

  // Development flags
  isDevelopment: __DEV__,
  isProduction: !__DEV__,
};

export default config;
