import { CategoryAPI } from '../config/categoryChoices';
import config from '../config/env';

// Test verileri
const TEST_CELEBRITIES = [
  {
    id: 1,
    name: "Leonardo DiCaprio",
    image: "https://image.tmdb.org/t/p/w500/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg",
    category: "actors",
    source: "TEST",
    popularity: 95.5,
    gender: "Erkek",
    knownFor: "acting"
  },
  {
    id: 2,
    name: "Scarlett Johansson",
    image: "https://image.tmdb.org/t/p/w500/3JTEc2tGUact9c0WktvpeJ9pajn.jpg",
    category: "actors",
    source: "TEST",
    popularity: 89.2,
    gender: "Kadın",
    knownFor: "Acting"
  },
  {
    id: 3,
    name: "Robert Downey Jr.",
    image: "https://image.tmdb.org/t/p/w500/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg",
    category: "actors",
    source: "TEST",
    popularity: 92.1,
    gender: "Erkek",
    knownFor: "Acting"
  },
  {
    id: 4,
    name: "Emma Stone",
    image: "https://image.tmdb.org/t/p/w500/wqEypkRUUZEcFmPV4O4JpZznmBk.jpg",
    category: "actors",
    source: "TEST",
    popularity: 85.7,
    gender: "Kadın",
    knownFor: "Acting"
  },
  {
    id: 5,
    name: "Tom Hanks",
    image: "https://image.tmdb.org/t/p/w500/a14CNByTYALAPSuci4drfhobpBu.jpg",
    category: "actors",
    source: "TEST",
    popularity: 88.9,
    gender: "Erkek",
    knownFor: "Acting"
  },
  {
    id: 6,
    name: "Jennifer Lawrence",
    image: "https://image.tmdb.org/t/p/w500/k6l8BWX1yqfGt95enzEkHoPvON4.jpg",
    category: "actors",
    source: "TEST",
    popularity: 87.3,
    gender: "Kadın",
    knownFor: "Acting"
  },
  {
    id: 7,
    name: "Chris Evans",
    image: "https://image.tmdb.org/t/p/w500/3bOGNsHlrswhyW79uvIHH1V43JI.jpg",
    category: "actors",
    source: "TEST",
    popularity: 84.6,
    gender: "Erkek",
    knownFor: "Acting"
  },
  {
    id: 8,
    name: "Margot Robbie",
    image: "https://image.tmdb.org/t/p/w500/euDPyqLnuwaWMHajcU3oZ9uZezR.jpg",
    category: "actors",
    source: "TEST",
    popularity: 91.4,
    gender: "Kadın",
    knownFor: "Acting"
  },
  {
    id: 9,
    name: "Ryan Reynolds",
    image: "https://image.tmdb.org/t/p/w500/2Orm6l3z3zukF1q0AgIOUqvwLeB.jpg",
    category: "actors",
    source: "TEST",
    popularity: 86.8,
    gender: "Erkek",
    knownFor: "Acting"
  },
  {
    id: 10,
    name: "Gal Gadot",
    image: "https://image.tmdb.org/t/p/w500/FejCCfVec4ej8pjUGGYtYhgDEF.jpg",
    category: "actors",
    source: "TEST",
    popularity: 83.2,
    gender: "Kadın",
    knownFor: "Acting"
  },
  // Test movie data
  {
    id: 11,
    name: "The Avengers",
    image: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    category: "movies",
    source: "TEST",
    popularity: 95.5,
    releaseDate: "2012-04-25",
    overview: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the trickster Loki and his alien army from enslaving humanity.",
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
    overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible.",
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
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
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
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
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
    overview: "A burger-loving hit man, his philosophical partner, a drug-addicted gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper.",
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
    overview: "In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.",
    voteAverage: 7.6,
    voteCount: 29000
  }
];

class PhotoService {
  constructor() {
    this.celebrities = [];
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

  async fetchPokemon(page = 1) {
    try {
      const limit = 100;
      const offset = 0;

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);

      if (!response.ok) {
        throw new Error(`PokéAPI error: ${response.status}`);
      }

      const data = await response.json();

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon, index) => {
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
          } catch (error) {
            return null;
          }
        })
      );

      const validPokemon = pokemonDetails.filter(p => p && p.sprite);

      return {
        success: true,
        data: {
          results: validPokemon,
          page: page,
          total_pages: 1,
          total_results: validPokemon.length
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }

  async fetchPopularPeople(page = 1, category = null) {
    try {
      if (category === 'pokemon') {
        return await this.fetchPokemon(page);
      }

      const normalizedCategory = String(category);
      let randomPage;
      if (normalizedCategory === 'popular_female' || normalizedCategory === 'popular_male') {
        randomPage = Math.floor(Math.random() * 10) + 1;
      } else {
        randomPage = Math.floor(Math.random() * 500) + 1;
      }

      const categoryConfig = CategoryAPI.getConfig(category);
      const provider = CategoryAPI.getProvider(category);
      const url = CategoryAPI.getFullURL(category);
      const params = CategoryAPI.getParams(category);
      const headers = CategoryAPI.getHeaders(category);
      const fetchConfig = CategoryAPI.getFetchConfig(category);

      if ((provider.name === 'The Movie Database' && (!config.TMDB_API_KEY || config.TMDB_API_KEY === 'demo_key'))){
        throw new Error(`${provider.name} API key bulunamadı`);
      }


      const urlParams = new URLSearchParams({
        page: randomPage.toString(),
        language: 'tr-TR', // TMDB için
        ...params
      });

      const fullUrl = `${url}?${urlParams}`;

      const response = await fetch(fullUrl, {
        ...fetchConfig,
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error(`${provider.name} API error: ${response.status}`);
      }

      const data = await response.json();

      this.apiError = false;

      if (data.results) {
        const originalCount = data.results.length;

        if (categoryConfig.type === 'movie') {
          data.results = data.results.filter(movie => movie.poster_path);
        } else {
          if (provider.name === 'The Movie Database') {
            data.results = data.results.filter(person => person.profile_path);
          }
        }

        data.results = this.shuffleArray(data.results);
        data.total_results = data.results.length;
      }


      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('Multi-API Error:', error);
      this.apiError = true;
      this.useTestData = true;
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  }

  transformTMDBPerson(person, details = null, categoryKey = null) {
    const imageBaseURL = CategoryAPI.getImageBaseURL(categoryKey) || config.TMDB_IMAGE_BASE_URL;
    const profileImage = person.profile_path
      ? `${imageBaseURL}${person.profile_path}`
      : null;

    return {
      id: person.id,
      name: person.name,
      image: profileImage,
      category: this.getCategoryFromPerson(person),
      source: 'API',
      popularity: person.popularity || 0,
      genderCode: person.gender, // Keep original code for translation
      gender: person.gender === 1 ? 'Kadın' : person.gender === 2 ? 'Erkek' : 'unknown',
      knownForCode: person.known_for_department, // Keep original for translation
      knownFor: this.getKnownForCategory(person.known_for_department),
      ...(details && {
        biography: details.biography || '',
        birthday: details.birthday || '',
        deathday: details.deathday || null,
        placeOfBirth: details.place_of_birth || '',
        homepage: details.homepage || '',
      }),
    };
  }

  transformTMDBMovie(movie, details = null, categoryKey = null) {
    const imageBaseURL = CategoryAPI.getImageBaseURL(categoryKey) || config.TMDB_IMAGE_BASE_URL;
    const posterImage = movie.poster_path
      ? `${imageBaseURL}${movie.poster_path}`
      : null;

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

  capitalizePokemonName(name) {
    return name.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  getKnownForCategory(department) {
    switch (department) {
      case 'Acting':
        return 'acting';
      case 'Directing':
        return 'directing';
      case 'Writing':
        return 'writing';
      case 'Production':
        return 'production';
      case 'Sound':
        return 'sound';
      case 'Camera':
        return 'camera';
      case 'Editing':
        return 'editing';
      case 'Art':
        return 'art';
      case 'Crew':
        return 'crew';
      default:
        return 'unknown';
    }
  }

  getCategoryFromPerson(person) {
    const department = person.known_for_department;

    switch (department) {
      case 'Acting':
        return 'actors';
      case 'Directing':
        return 'actors';
      case 'Writing':
        return 'actors';
      case 'Production':
        return 'actors';
      case 'Sound':
        return 'actors';
      case 'Camera':
        return 'actors';
      case 'Editing':
        return 'actors';
      case 'Art':
        return 'actors';
      case 'Crew':
        return 'actors';
      default:
        return 'actors';
    }
  }

  hasApiError() {
    return this.apiError;
  }

  async getPhotos(category = null) {
    try {
      if (this.currentCategory !== category) {
        this.celebrities = [];
        this.currentPage = 1;
      }

      this.currentCategory = category;
      let response;

      if (!this.useTestData) {
        const randomPage = Math.floor(Math.random() * 100) + 1;

        response = await this.fetchPopularPeople(randomPage, category);
      }

      if (response.success && response.data.results) {
        this.totalPages = response.data.total_pages;

        let transformedItems;
        if (response.data.results[0]?.source === 'TEST') {
          transformedItems = response.data.results;
        } else if (category === 'pokemon') {
          transformedItems = response.data.results.map(pokemon => this.transformPokemon(pokemon));
        } else {
          const categoryConfig = CategoryAPI.getConfig(category);

          if (categoryConfig.type === 'movie') {
            transformedItems = response.data.results
              .filter(movie => movie.poster_path)
              .map(movie => this.transformTMDBMovie(movie));
          } else {
            transformedItems = response.data.results
              .filter(person => person.profile_path)
              .map(person => this.transformTMDBPerson(person));
          }
        }

        let filteredItems = transformedItems;
        if (category && category !== 'general' && response.data.results[0]?.source !== 'TEST') {
          const categoryConfig = CategoryAPI.getConfig(category);

          if (categoryConfig.type === 'movie') {
            filteredItems = transformedItems;
          } else if (categoryConfig.type === 'pokemon') {
            filteredItems = transformedItems;
          } else if (category === 'popular_female') {
            filteredItems = transformedItems.filter(person => person.gender === 'Kadın');
          } else if (category === 'popular_male') {
            filteredItems = transformedItems.filter(person => person.gender === 'Erkek');
          } else if (category === 1) {
            filteredItems = transformedItems.filter(person => person.gender === 'Kadın');
          } else if (category === 2) {
            filteredItems = transformedItems.filter(person => person.gender === 'Erkek');
          } else {
            filteredItems = transformedItems.filter(person => person.category === category);
          }
        }

        filteredItems = this.shuffleArray(filteredItems);
        this.celebrities = [...this.celebrities, ...filteredItems];

        const finalResult = {
          success: true,
          data: filteredItems,
          pagination: {
            currentPage: this.currentPage,
            totalPages: this.totalPages,
            hasMore: this.currentPage < this.totalPages,
          },
          usingTestData: this.useTestData,
          apiError: this.apiError,
        };

        return finalResult;
      }

      throw new Error('Veri alınamadı');
    } catch (error) {
      console.error('GetPhotos Error:', error);

      if (!this.useTestData) {
        this.useTestData = true;
        this.apiError = true;
        return await this.getPhotos(category);
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
      let response = await this.getPhotos(this.currentCategory, this.currentGender);

      if (!response.success) {
        throw new Error('Fotoğraf verisi alınamadı');
      }

  let photos = response.data.filter(photo => !excludeIds.includes(photo.id));

      let attempts = 0;
      while (photos.length < 2 && attempts < 3) {

        const moreResponse = await this.getPhotos(this.currentCategory, this.currentGender);
        if (moreResponse.success && moreResponse.data.length > 0) {
          const newPhotos = moreResponse.data.filter(photo => !excludeIds.includes(photo.id));

          const existingIds = photos.map(p => p.id);
          const uniqueNewPhotos = newPhotos.filter(photo => !existingIds.includes(photo.id));

          photos.push(...uniqueNewPhotos);
        } else {
          break;
        }
        attempts++;
      }

      if (photos.length < 2) {
        console.error('❌ Yeterli unique fotoğraf bulunamadı:', photos.length);
        return {
          success: false,
          error: 'Yeterli unique fotoğraf bulunamadı',
          data: null,
        };
      }

      const shuffled = this.shuffleArray([...photos]);
      const selectedPair = [shuffled[0], shuffled[1]];

      if (selectedPair[0].id === selectedPair[1].id) {
          if (shuffled.length > 2) {
          selectedPair[1] = shuffled[2];
        } else {
          console.error('❌ Farklı kişiler seçilemedi');
          return {
            success: false,
            error: 'Farklı kişiler seçilemedi',
            data: null,
          };
        }
      }

      return {
        success: true,
        data: selectedPair,
      };
    } catch (error) {
      console.error('❌ getRandomPair error:', error);
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  }

  async submitSelection(selection) {
    try {
      return {
        success: true,
        data: { message: 'Seçim başarıyla kaydedildi' },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  clearCache() {
    this.celebrities = [];
    this.currentPage = 1;
    this.totalPages = 1;
    this.apiError = false;
    this.useTestData = false;
    this.currentGender = null;
    this.currentCategory = null;
  }

  clearPhotoCache() {
    this.celebrities = [];
    this.currentPage = 1;
  }

  resetGenderFilter() {
    this.currentGender = null;
    this.currentCategory = null;
    this.celebrities = [];
    this.currentPage = 1;
  }

  async loadMore() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      return await this.getPhotos(this.currentCategory, this.currentGender);
    }
    return {
      success: false,
      error: 'Daha fazla veri yok',
      data: [],
      usingTestData: this.useTestData,
      apiError: this.apiError,
    };
  }

  async getFreshOpponent(currentWinner, excludeIds = []) {
    try {
      const response = await this.getPhotos(this.currentCategory, this.currentGender);

      if (!response.success || !response.data) {
        return null;
      }

      const allExcludeIds = [...excludeIds, currentWinner?.id].filter(Boolean);
      const availableOpponents = response.data.filter(
        photo => !allExcludeIds.includes(photo.id)
      );

      if (availableOpponents.length === 0) {
        return null;
      }

      const randomOpponent = availableOpponents[Math.floor(Math.random() * availableOpponents.length)];

      return randomOpponent;

    } catch (error) {
      console.error('❌ getFreshOpponent error:', error);
      return null;
    }
  }

  resetCategoryFilter() {
    this.currentCategory = null;
  }

  static getHomepageCategories() {
    return CategoryAPI.getByType('person').concat(CategoryAPI.getByType('movie'));
  }

  static getCategoryConfig(categoryKey) {
    return CategoryAPI.getConfig(categoryKey);
  }

  static getAllCategories() {
    return CategoryAPI.getByType('person').concat(CategoryAPI.getByType('movie'));
  }
}

const photoService = new PhotoService();

export default photoService;
