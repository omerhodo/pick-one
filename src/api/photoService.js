import { CategoryAPI } from '../config/categoryChoices';
import config from '../config/env';

// Test verileri - Sadece filmler
const TEST_MOVIES = [
  {
    id: 11,
    name: "The Avengers",
    image: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    category: "movies",
    source: "TEST",
    popularity: 95.5,
    releaseDate: "2012-04-25",
    overview: "Earth mightiest heroes must come together.",
    voteAverage: 7.7,
    voteCount: 28000
  },
  {
    id: 12,
    name: "Inception",
    image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    category: "movies",
    source: "TEST",
    popularity: 89.2,
    releaseDate: "2010-07-16",
    overview: "A skilled thief who commits corporate espionage by infiltrating the subconscious.",
    voteAverage: 8.4,
    voteCount: 35000
  },
  {
    id: 13,
    name: "Interstellar",
    image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    category: "movies",
    source: "TEST",
    popularity: 87.3,
    releaseDate: "2014-11-05",
    overview: "Explorers make use of a newly discovered wormhole.",
    voteAverage: 8.6,
    voteCount: 32000
  },
  {
    id: 14,
    name: "The Dark Knight",
    image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    category: "movies",
    source: "TEST",
    popularity: 92.1,
    releaseDate: "2008-07-18",
    overview: "Batman raises the stakes in his war on crime.",
    voteAverage: 9.0,
    voteCount: 31000
  },
  {
    id: 15,
    name: "Pulp Fiction",
    image: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    category: "movies",
    source: "TEST",
    popularity: 88.9,
    releaseDate: "1994-10-14",
    overview: "A burger-loving hit man and his philosophical partner converge in this comedy crime caper.",
    voteAverage: 8.9,
    voteCount: 27000
  },
  {
    id: 16,
    name: "Avatar",
    image: "https://image.tmdb.org/t/p/w500/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg",
    category: "movies",
    source: "TEST",
    popularity: 91.4,
    releaseDate: "2009-12-18",
    overview: "A paraplegic Marine is dispatched to the moon Pandora on a unique mission.",
    voteAverage: 7.6,
    voteCount: 29000
  },
  {
    id: 17,
    name: "The Matrix",
    image: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    category: "movies",
    source: "TEST",
    popularity: 90.0,
    releaseDate: "1999-03-31",
    overview: "A computer hacker learns about the true nature of his reality.",
    voteAverage: 8.7,
    voteCount: 30000
  },
  {
    id: 18,
    name: "Fight Club",
    image: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    category: "movies",
    source: "TEST",
    popularity: 88.0,
    releaseDate: "1999-10-15",
    overview: "An insomniac office worker forms an underground fight club.",
    voteAverage: 8.8,
    voteCount: 29000
  },
  {
    id: 19,
    name: "Forrest Gump",
    image: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    category: "movies",
    source: "TEST",
    popularity: 87.5,
    releaseDate: "1994-07-06",
    overview: "The presidencies of Kennedy and Johnson through the eyes of an Alabama man.",
    voteAverage: 8.8,
    voteCount: 28000
  },
  {
    id: 20,
    name: "The Shawshank Redemption",
    image: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    category: "movies",
    source: "TEST",
    popularity: 86.0,
    releaseDate: "1994-09-23",
    overview: "Two imprisoned men bond over a number of years.",
    voteAverage: 9.3,
    voteCount: 27000
  }
];

class PhotoService {
  constructor() {
    this.items = [];
    this.currentPage = 1;
    this.totalPages = 1;
    this.apiError = false;
    this.useTestData = false;
    this.currentCategory = null;
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // ========== Pokemon API ==========
  async fetchPokemon(page = 1) {
    try {
      const limit = 100;
      const offset = 0;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      if (!response.ok) throw new Error(`PokeAPI error: ${response.status}`);
      const data = await response.json();
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          try {
            const detailResponse = await fetch(pokemon.url);
            const detail = await detailResponse.json();
            return {
              id: detail.id,
              name: detail.name,
              url: pokemon.url,
              sprite: detail.sprites?.other?.['official-artwork']?.front_default || detail.sprites?.front_default,
              height: detail.height,
              weight: detail.weight,
              types: detail.types?.map(t => t.type.name) || []
            };
          } catch (error) { return null; }
        })
      );
      const validPokemon = pokemonDetails.filter(p => p && p.sprite);
      return {
        success: true,
        data: { results: validPokemon, page: page, total_pages: 1, total_results: validPokemon.length }
      };
    } catch (error) {
      return { success: false, error: error.message, data: null };
    }
  }

  // ========== Rick and Morty API ==========
  async fetchRickAndMorty(page = 1) {
    try {
      const randomPage = Math.floor(Math.random() * 42) + 1;
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${randomPage}`);
      if (!response.ok) throw new Error(`Rick and Morty API error: ${response.status}`);
      const data = await response.json();
      const characters = data.results
        .filter(char => char.image)
        .map(char => ({
          id: char.id,
          name: char.name,
          image: char.image,
          status: char.status,
          species: char.species,
          origin: char.origin?.name || 'Unknown',
          location: char.location?.name || 'Unknown',
        }));
      return {
        success: true,
        data: { results: characters, page: randomPage, total_pages: data.info?.pages || 42, total_results: characters.length }
      };
    } catch (error) {
      return { success: false, error: error.message, data: null };
    }
  }

  // ========== Jikan (MyAnimeList) API ==========
  async fetchAnime(page = 1) {
    try {
      const randomPage = Math.floor(Math.random() * 10) + 1;
      const response = await fetch(`https://api.jikan.moe/v4/top/anime?page=${randomPage}&limit=25`);
      if (!response.ok) throw new Error(`Jikan API error: ${response.status}`);
      const data = await response.json();
      const animeList = (data.data || [])
        .filter(anime => anime.images?.jpg?.large_image_url)
        .map(anime => ({
          id: anime.mal_id,
          name: anime.title,
          image: anime.images.jpg.large_image_url,
          score: anime.score || 0,
          episodes: anime.episodes || 0,
          status: anime.status || '',
          synopsis: anime.synopsis || '',
          type: anime.type || 'TV',
          year: anime.year || null,
        }));
      return {
        success: true,
        data: { results: animeList, page: randomPage, total_pages: data.pagination?.last_visible_page || 10, total_results: animeList.length }
      };
    } catch (error) {
      return { success: false, error: error.message, data: null };
    }
  }

  // ========== TMDB Movies API ==========
  async fetchTMDBMovies(page = 1, category = null) {
    try {
      const randomPage = Math.floor(Math.random() * 20) + 1;
      const categoryConfig = CategoryAPI.getConfig(category);
      const provider = CategoryAPI.getProvider(category);
      const url = CategoryAPI.getFullURL(category);
      const params = CategoryAPI.getParams(category);
      const fetchConfig = CategoryAPI.getFetchConfig(category);

      if (provider.name === 'The Movie Database' && (!config.TMDB_API_KEY || config.TMDB_API_KEY === 'demo_key')) {
        throw new Error(`${provider.name} API key bulunamadi`);
      }

      const urlParams = new URLSearchParams({
        page: randomPage.toString(),
        language: 'tr-TR',
        ...params
      });

      const fullUrl = `${url}?${urlParams}`;
      const response = await fetch(fullUrl, { ...fetchConfig, method: 'GET' });

      if (!response.ok) throw new Error(`${provider.name} API error: ${response.status}`);

      const data = await response.json();
      if (data.results) {
        data.results = data.results.filter(movie => movie.poster_path);
        data.results = this.shuffleArray(data.results);
        data.total_results = data.results.length;
      }

      return { success: true, data: data };
    } catch (error) {
      console.error('TMDB Movies Error:', error);
      return { success: false, error: error.message, data: null };
    }
  }

  // ========== Main Fetch Router ==========
  async fetchPopularPeople(page = 1, category = null) {
    try {
      if (category === 'pokemon') return await this.fetchPokemon(page);
      if (category === 'rick_morty') return await this.fetchRickAndMorty(page);
      if (category === 'anime') return await this.fetchAnime(page);
      // All other categories are TMDB movies
      return await this.fetchTMDBMovies(page, category);
    } catch (error) {
      console.error('Fetch Error:', error);
      this.apiError = true;
      this.useTestData = true;
      return { success: false, error: error.message, data: null };
    }
  }

  // ========== Transform Functions ==========
  transformTMDBMovie(movie, details, categoryKey) {
    const imageBaseURL = CategoryAPI.getImageBaseURL(categoryKey) || config.TMDB_IMAGE_BASE_URL;
    const posterImage = movie.poster_path ? `${imageBaseURL}${movie.poster_path}` : null;
    return {
      id: movie.id,
      name: movie.title || movie.original_title,
      image: posterImage,
      category: 'movies',
      source: 'API',
      popularity: movie.popularity || 0,
      releaseDate: movie.release_date || '',
      overview: movie.overview || '',
      voteAverage: movie.vote_average || 0,
      voteCount: movie.vote_count || 0,
      ...(details && {
        budget: details.budget || 0,
        revenue: details.revenue || 0,
        runtime: details.runtime || 0,
        genres: details.genres || [],
        productionCompanies: details.production_companies || [],
        homepage: details.homepage || '',
      }),
    };
  }

  transformPokemon(pokemon) {
    return {
      id: pokemon.id,
      name: this.capitalizePokemonName(pokemon.name),
      image: pokemon.sprite,
      category: 'pokemon',
      source: 'API',
      popularity: 1000 - pokemon.id,
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types,
      pokemonId: pokemon.id
    };
  }

  transformRickAndMorty(character) {
    return {
      id: character.id,
      name: character.name,
      image: character.image,
      category: 'rick_morty',
      source: 'API',
      popularity: 1000 - character.id,
      status: character.status,
      species: character.species,
      origin: character.origin,
      location: character.location,
    };
  }

  transformAnime(anime) {
    return {
      id: anime.id,
      name: anime.name,
      image: anime.image,
      category: 'anime',
      source: 'API',
      popularity: anime.score || 0,
      score: anime.score,
      episodes: anime.episodes,
      status: anime.status,
      synopsis: anime.synopsis,
      type: anime.type,
      year: anime.year,
    };
  }

  capitalizePokemonName(name) {
    return name.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  hasApiError() {
    return this.apiError;
  }

  // ========== Main getPhotos ==========
  async getPhotos(category) {
    try {
      if (this.currentCategory !== category) {
        this.items = [];
        this.currentPage = 1;
      }
      this.currentCategory = category;
      let response;

      if (!this.useTestData) {
        const randomPage = Math.floor(Math.random() * 100) + 1;
        response = await this.fetchPopularPeople(randomPage, category);
      }

      if (response && response.success && response.data && response.data.results) {
        this.totalPages = response.data.total_pages;
        this.apiError = false;

        let transformedItems;
        if (response.data.results[0]?.source === 'TEST') {
          transformedItems = response.data.results;
        } else if (category === 'pokemon') {
          transformedItems = response.data.results.map(p => this.transformPokemon(p));
        } else if (category === 'rick_morty') {
          transformedItems = response.data.results.map(c => this.transformRickAndMorty(c));
        } else if (category === 'anime') {
          transformedItems = response.data.results.map(a => this.transformAnime(a));
        } else {
          // TMDB movies (all movie categories)
          transformedItems = response.data.results
            .filter(movie => movie.poster_path)
            .map(movie => this.transformTMDBMovie(movie));
        }

        let filteredItems = this.shuffleArray(transformedItems);
        this.items = [...this.items, ...filteredItems];

        return {
          success: true,
          data: filteredItems,
          pagination: { currentPage: this.currentPage, totalPages: this.totalPages, hasMore: this.currentPage < this.totalPages },
          usingTestData: this.useTestData,
          apiError: this.apiError,
        };
      }

      throw new Error('Veri alinamadi');
    } catch (error) {
      console.error('GetPhotos Error:', error);

      if (!this.useTestData) {
        this.useTestData = true;
        this.apiError = true;
        const testData = this.shuffleArray([...TEST_MOVIES]);
        this.items = testData;
        return {
          success: true,
          data: testData,
          pagination: { currentPage: 1, totalPages: 1, hasMore: false },
          usingTestData: true,
          apiError: true,
        };
      }

      return {
        success: false,
        error: error.message,
        data: null,
        usingTestData: this.useTestData,
        apiError: this.apiError,
      };
    }
  }

  async getRandomPair(excludeIds = []) {
    try {
      let response = await this.getPhotos(this.currentCategory);
      if (!response.success) throw new Error('Veri alinamadi');

      let photos = response.data.filter(photo => !excludeIds.includes(photo.id));
      let attempts = 0;
      while (photos.length < 2 && attempts < 3) {
        const moreResponse = await this.getPhotos(this.currentCategory);
        if (moreResponse.success && moreResponse.data.length > 0) {
          const newPhotos = moreResponse.data.filter(photo => !excludeIds.includes(photo.id));
          const existingIds = photos.map(p => p.id);
          const uniqueNewPhotos = newPhotos.filter(photo => !existingIds.includes(photo.id));
          photos.push(...uniqueNewPhotos);
        } else { break; }
        attempts++;
      }

      if (photos.length < 2) {
        return { success: false, error: 'Yeterli veri bulunamadi', data: null };
      }

      const shuffled = this.shuffleArray([...photos]);
      const selectedPair = [shuffled[0], shuffled[1]];
      if (selectedPair[0].id === selectedPair[1].id) {
        if (shuffled.length > 2) { selectedPair[1] = shuffled[2]; }
        else { return { success: false, error: 'Farkli ogeler secilemedi', data: null }; }
      }

      return { success: true, data: selectedPair };
    } catch (error) {
      console.error('getRandomPair error:', error);
      return { success: false, error: error.message, data: null };
    }
  }

  async submitSelection(selection) {
    try {
      return { success: true, data: { message: 'Secim basariyla kaydedildi' } };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  clearCache() {
    this.items = [];
    this.currentPage = 1;
    this.totalPages = 1;
    this.apiError = false;
    this.useTestData = false;
    this.currentCategory = null;
  }

  clearPhotoCache() {
    this.items = [];
    this.currentPage = 1;
  }

  resetCategoryFilter() {
    this.currentCategory = null;
    this.items = [];
    this.currentPage = 1;
  }

  async loadMore() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      return await this.getPhotos(this.currentCategory);
    }
    return { success: false, error: 'Daha fazla veri yok', data: [], usingTestData: this.useTestData, apiError: this.apiError };
  }

  async getFreshOpponent(currentWinner, excludeIds = []) {
    try {
      const response = await this.getPhotos(this.currentCategory);
      if (!response.success || !response.data) return null;
      const allExcludeIds = [...excludeIds, currentWinner?.id].filter(Boolean);
      const availableOpponents = response.data.filter(photo => !allExcludeIds.includes(photo.id));
      if (availableOpponents.length === 0) return null;
      return availableOpponents[Math.floor(Math.random() * availableOpponents.length)];
    } catch (error) {
      console.error('getFreshOpponent error:', error);
      return null;
    }
  }

  static getHomepageCategories() {
    return CategoryAPI.getByType('movie');
  }

  static getCategoryConfig(categoryKey) {
    return CategoryAPI.getConfig(categoryKey);
  }

  static getAllCategories() {
    return CategoryAPI.getByType('movie');
  }
}

const photoService = new PhotoService();

export default photoService;
