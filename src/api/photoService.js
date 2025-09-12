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
    knownFor: "Acting"
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

  async fetchPopularPeople(page = 1, category = null) {
    try {
      const randomPage = Math.floor(Math.random() * 500) + 1;

      // CategoryAPI'den kategori ve sağlayıcı bilgilerini al
      const categoryConfig = CategoryAPI.getConfig(category);
      const provider = CategoryAPI.getProvider(category);
      const url = CategoryAPI.getFullURL(category);
      const params = CategoryAPI.getParams(category);
      const headers = CategoryAPI.getHeaders(category);
      const fetchConfig = CategoryAPI.getFetchConfig(category);

      // API key kontrolü (sadece gerekli olan sağlayıcılar için)
      if ((provider.name === 'The Movie Database' && (!config.TMDB_API_KEY || config.TMDB_API_KEY === 'demo_key')) ||
          (provider.name === 'API Ninjas' && (!config.API_NINJAS_KEY || config.API_NINJAS_KEY === 'demo_key'))) {
        throw new Error(`${provider.name} API key bulunamadı`);
      }

      console.log(`🌐 ${provider.name} API çağrısı yapılıyor:`);
      console.log(`   Category: ${categoryConfig.displayName} (${categoryConfig.key})`);
      console.log(`   Provider: ${provider.name}`);
      console.log(`   URL: ${url}`);
      console.log(`   Params:`, params);
      console.log(`   Headers:`, headers);

      // URL parametrelerini oluştur
      const urlParams = new URLSearchParams({
        page: randomPage.toString(),
        language: 'tr-TR', // TMDB için
        ...params
      });

      const fullUrl = `${url}?${urlParams}`;
      console.log(`   Full URL: ${fullUrl}`);

      // Fetch isteği yap
      const response = await fetch(fullUrl, {
        ...fetchConfig,
        method: 'GET'
      });

      if (!response.ok) {
        console.log(`❌ ${provider.name} API error: ${response.status} - ${response.statusText}`);
        throw new Error(`${provider.name} API error: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ ${provider.name} API response alındı. Sonuç sayısı: ${data.results?.length || 0}`);

      this.apiError = false;

      if (data.results) {
        const originalCount = data.results.length;

        // Fotoğraf/poster olan items'ları filtrele (sağlayıcıya göre)
        if (categoryConfig.type === 'movie') {
          data.results = data.results.filter(movie => movie.poster_path);
          console.log(`🎬 Poster fotoğrafı filtrelemesi: ${originalCount} → ${data.results.length}`);
        } else {
          // TMDB için profile_path, diğer API'ler için farklı fieldlar olabilir
          if (provider.name === 'The Movie Database') {
            data.results = data.results.filter(person => person.profile_path);
            console.log(`📷 Profil fotoğrafı filtrelemesi: ${originalCount} → ${data.results.length}`);
          } else if (provider.name === 'API Ninjas') {
            // API Ninjas farklı bir format kullanır, filtreleme gerekirse burada yapılır
            console.log(`🥷 API Ninjas verisi filtreleniyor: ${originalCount} → ${data.results.length}`);
          }
        }

        // Sonuçları karıştır
        data.results = this.shuffleArray(data.results);
        data.total_results = data.results.length;
      }

      console.log(`${provider.name} API Response for category=${category}:`, {
        provider: provider.name,
        endpoint: url.split('/').pop(),
        current_page: data.page,
        total_pages: data.total_pages,
        total_results: data.total_results,
        filtered_results: data.results?.length,
        sample_data: data.results?.slice(0, 3).map(item => ({
          name: item.name || item.title,
          type: categoryConfig.type
        }))
      });

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

  // TMDB verisini uygulama formatına çevir
  // Transform API data to app format (supports multiple providers)
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
      gender: person.gender === 1 ? 'Kadın' : person.gender === 2 ? 'Erkek' : 'Bilinmeyen',
      knownFor: person.known_for_department || 'unknown',
      ...(details && {
        biography: details.biography || '',
        birthday: details.birthday || '',
        deathday: details.deathday || null,
        placeOfBirth: details.place_of_birth || '',
        homepage: details.homepage || '',
      }),
    };
  }

  // Transform movie data to app format
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

  getCategoryFromPerson(person) {
    const department = person.known_for_department;

    switch (department) {
      case 'Acting':
        return 'actors';
      case 'Directing':
        return 'actors'; // ünlüler → actors
      case 'Writing':
        return 'actors'; // ünlüler → actors
      case 'Production':
        return 'actors'; // ünlüler → actors
      case 'Sound':
        return 'actors'; // ünlüler → actors (musicians → actors)
      case 'Camera':
        return 'actors'; // ünlüler → actors
      case 'Editing':
        return 'actors'; // ünlüler → actors
      case 'Art':
        return 'actors'; // ünlüler → actors
      case 'Crew':
        return 'actors'; // ünlüler → actors
      default:
        return 'actors'; // general → actors
    }
  }

  // Test verilerini getir
  getTestData(page = 1, category = null) {
    const itemsPerPage = 4;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    let filteredData = TEST_CELEBRITIES;

    // Category filtresi
    if (category !== null) {
      switch (category) {
        case 1: // Kadın Ünlüler
          filteredData = filteredData.filter(person => person.gender === 'Kadın');
          break;
        case 2: // Erkek Ünlüler
          filteredData = filteredData.filter(person => person.gender === 'Erkek');
          break;
        case 'actors': // Aktörler
          filteredData = filteredData.filter(person => person.knownFor === 'Acting');
          break;
        case 'musicians': // Müzisyenler
          filteredData = filteredData.filter(person => person.knownFor === 'Sound');
          break;
        case 'writers': // Yazarlar
          filteredData = filteredData.filter(person => person.knownFor === 'Writing');
          break;
        case 'movies': // Filmler
          filteredData = filteredData.filter(item => item.category === 'movies');
          break;
        // Diğer kategoriler için fallback
        default:
          // Tüm ünlüler, filtre uygulanmaz
          break;
      }
    }

    const pageData = filteredData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return {
      success: true,
      data: {
        results: pageData,
        page: page,
        total_pages: totalPages,
        total_results: filteredData.length
      }
    };
  }  // API durumunu kontrol et
  hasApiError() {
    return this.apiError;
  }

  // Ana fotoğraf getirme metodu
  async getPhotos(category = null) {
    try {
      console.log(`🎯 getPhotos called with: category=${category}`);

      // Eğer category değişmişse, cache'i temizle
      if (this.currentCategory !== category) {
        if (this.celebrities.length > 0) { // Sadece cache varsa log bas
          console.log(`🔄 Category changed from ${this.currentCategory} to ${category}, clearing cache`);
        }
        this.celebrities = [];
        this.currentPage = 1;
      }

      // Parametreleri sakla
      this.currentCategory = category;
      let response;

      // Önce TMDB API'yi dene, hata varsa test verisine geç
      if (!this.useTestData) {
        // Tamamen rastgele sayfa seçimi (gerçek rastgelelik için)
        const randomPage = Math.floor(Math.random() * 100) + 1;

        console.log(`🎲 Tamamen rastgele sayfa seçiliyor: ${randomPage} (category: ${category})`);
        response = await this.fetchPopularPeople(randomPage, category);

        // API başarısızsa test verisini kullan
        if (!response.success) {
          console.log('TMDB API başarısız, test verisi kullanılıyor...');
          response = this.getTestData(this.currentPage, category);
        }
      } else {
        // Zaten test verisi modundayız
        response = this.getTestData(this.currentPage, category);
      }

      if (response.success && response.data.results) {
        console.log(`✅ Response başarılı, ${response.data.results.length} sonuç alındı`);
        this.totalPages = response.data.total_pages;

        // TMDB verilerini transform et (test verisi zaten uygun formatta)
        let transformedItems;
        if (response.data.results[0]?.source === 'TEST') {
          // Test verisi, transform etme
          console.log(`📋 Test verisi kullanılıyor`);
          transformedItems = response.data.results;
        } else {
          // TMDB verisi, transform et
          console.log(`🔄 TMDB verisi transform ediliyor...`);
          const categoryConfig = CategoryAPI.getConfig(category);

          if (categoryConfig.type === 'movie') {
            // Movie transformation
            transformedItems = response.data.results
              .filter(movie => movie.poster_path)
              .map(movie => this.transformTMDBMovie(movie));
            console.log(`   Transform sonrası: ${transformedItems.length} film`);
            console.log(`   İlk birkaç filmin bilgisi:`, transformedItems.slice(0,3).map(m => `${m.name}: ${m.category}`));
          } else {
            // Person transformation
            transformedItems = response.data.results
              .filter(person => person.profile_path)
              .map(person => this.transformTMDBPerson(person));
            console.log(`   Transform sonrası: ${transformedItems.length} kişi`);
            console.log(`   İlk birkaç kişinin kategori bilgisi:`, transformedItems.slice(0,3).map(p => `${p.name}: ${p.category}`));
          }
        }

        // Kategori filtresi varsa uygula (sadece TMDB verileri için)
        let filteredItems = transformedItems;
        if (category && category !== 'general' && response.data.results[0]?.source !== 'TEST') {
          const categoryConfig = CategoryAPI.getConfig(category);
          console.log(`🔍 Kategori filtresi uygulanıyor: ${categoryConfig.displayName} (${category})`);

          if (categoryConfig.type === 'movie') {
            // Movies kategori filtresi gerekmiyor, zaten movie'ler geldi
            filteredItems = transformedItems;
            console.log(`   Movies kategorisi: ${filteredItems.length} film`);
          } else if (category === 1) {
            // Kadın ünlüler
            filteredItems = transformedItems.filter(person => person.gender === 'Kadın');
            console.log(`   Gender filtresi (Kadın) sonrası: ${filteredItems.length} kişi`);
          } else if (category === 2) {
            // Erkek ünlüler
            filteredItems = transformedItems.filter(person => person.gender === 'Erkek');
            console.log(`   Gender filtresi (Erkek) sonrası: ${filteredItems.length} kişi`);
          } else {
            // Profession-based kategoriler
            filteredItems = transformedItems.filter(person => person.category === category);
            console.log(`   Profession filtresi (${category}) sonrası: ${filteredItems.length} kişi`);
          }

          if (categoryConfig.type !== 'movie') {
            console.log(`   İlk birkaç kişinin bilgisi:`, filteredItems.slice(0,3).map(p => `${p.name} (${p.gender}, ${p.category})`));
          } else {
            console.log(`   İlk birkaç filmin bilgisi:`, filteredItems.slice(0,3).map(m => `${m.name} (${m.releaseDate})`));
          }
        }

        // Sonuçları karıştır (tam rastgelelik için)
        filteredItems = this.shuffleArray(filteredItems);
        console.log(`🎯 ${filteredItems.length} sonuç karıştırıldı`);

        this.celebrities = [...this.celebrities, ...filteredItems];
        console.log(`📦 Cache'e eklendi. Toplam cache: ${this.celebrities.length} item`);

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

        console.log(`🎊 getPhotos sonucu:`, {
          success: finalResult.success,
          dataLength: finalResult.data.length,
          usingTestData: finalResult.usingTestData,
          apiError: finalResult.apiError
        });

        return finalResult;
      }

      throw new Error('Veri alınamadı');
    } catch (error) {
      console.error('GetPhotos Error:', error);

      // Son çare olarak test verisini dene
      if (!this.useTestData) {
        console.log('Acil durum: Test verisi kullanılıyor...');
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
      console.log('🎯 getRandomPair çağrıldı, excludeIds:', excludeIds);

      let response = await this.getPhotos(this.currentCategory, this.currentGender);

      if (!response.success) {
        throw new Error('Fotoğraf verisi alınamadı');
      }

      let photos = response.data.filter(photo => !excludeIds.includes(photo.id));
      console.log(`📊 Toplam ${response.data.length} fotoğraf, ${excludeIds.length} filtrelendi, kalan: ${photos.length}`);

      let attempts = 0;
      while (photos.length < 2 && attempts < 3) {
        console.log(`⚠️ Sadece ${photos.length} fotoğraf kaldı, daha fazla veri yükleniyor... (deneme ${attempts + 1})`);

        const moreResponse = await this.getPhotos(this.currentCategory, this.currentGender);
        if (moreResponse.success && moreResponse.data.length > 0) {
          const newPhotos = moreResponse.data.filter(photo => !excludeIds.includes(photo.id));

          const existingIds = photos.map(p => p.id);
          const uniqueNewPhotos = newPhotos.filter(photo => !existingIds.includes(photo.id));

          photos.push(...uniqueNewPhotos);
          console.log(`✅ ${uniqueNewPhotos.length} yeni unique fotoğraf eklendi, toplam: ${photos.length}`);
        } else {
          console.log('❌ Daha fazla veri alınamadı');
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
          console.log('⚠️ Aynı kişi tespit edildi, 3. kişi seçildi');
        } else {
          console.error('❌ Farklı kişiler seçilemedi');
          return {
            success: false,
            error: 'Farklı kişiler seçilemedi',
            data: null,
          };
        }
      }

      console.log('✅ Seçilen çift:', selectedPair.map(p => `${p.name} (ID: ${p.id})`));

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
      console.log('Seçim kaydedildi:', selection);

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
    console.log('🔄 Gender filter resetleniyor... (API isteği yok)');
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
      console.log(`🔄 Fresh opponent araniyor: ${currentWinner?.name} için`);

      const response = await this.getPhotos(this.currentCategory, this.currentGender);

      if (!response.success || !response.data) {
        console.log('❌ Fresh data alınamadı');
        return null;
      }

      const allExcludeIds = [...excludeIds, currentWinner?.id].filter(Boolean);
      const availableOpponents = response.data.filter(
        photo => !allExcludeIds.includes(photo.id)
      );

      console.log(`📊 Fresh data: ${response.data.length} total, ${availableOpponents.length} available opponents`);

      if (availableOpponents.length === 0) {
        console.log('❌ Fresh data\'da uygun rakip yok');
        return null;
      }

      const randomOpponent = availableOpponents[Math.floor(Math.random() * availableOpponents.length)];
      console.log(`✅ Fresh opponent bulundu: ${randomOpponent?.name} (ID: ${randomOpponent?.id})`);

      return randomOpponent;

    } catch (error) {
      console.error('❌ getFreshOpponent error:', error);
      return null;
    }
  }

  // Category filter'ı resetle
  resetCategoryFilter() {
    this.currentCategory = null;
    console.log('📝 Category filter resetlendi');
  }

  // Ana sayfa için kategori listesi getir
  static getHomepageCategories() {
    return CategoryAPI.getByType('person').concat(CategoryAPI.getByType('movie'));
  }

  // Belirli bir kategorinin konfigürasyonunu getir
  static getCategoryConfig(categoryKey) {
    return CategoryAPI.getConfig(categoryKey);
  }

  // Tüm kategori konfigürasyonlarını getir
  static getAllCategories() {
    return CategoryAPI.getByType('person').concat(CategoryAPI.getByType('movie'));
  }
}

const photoService = new PhotoService();

export default photoService;
