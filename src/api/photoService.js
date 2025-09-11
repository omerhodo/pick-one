import config from '../config/env';

// Test verileri
const TEST_CELEBRITIES = [
  {
    id: 1,
    name: "Leonardo DiCaprio",
    image: "https://image.tmdb.org/t/p/w500/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg",
    category: "Sinema",
    source: "TEST",
    popularity: 95.5,
    gender: "Erkek",
    knownFor: "Acting"
  },
  {
    id: 2,
    name: "Scarlett Johansson",
    image: "https://image.tmdb.org/t/p/w500/3JTEc2tGUact9c0WktvpeJ9pajn.jpg",
    category: "Sinema",
    source: "TEST",
    popularity: 89.2,
    gender: "Kadın",
    knownFor: "Acting"
  },
  {
    id: 3,
    name: "Robert Downey Jr.",
    image: "https://image.tmdb.org/t/p/w500/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg",
    category: "Sinema",
    source: "TEST",
    popularity: 92.1,
    gender: "Erkek",
    knownFor: "Acting"
  },
  {
    id: 4,
    name: "Emma Stone",
    image: "https://image.tmdb.org/t/p/w500/wqEypkRUUZEcFmPV4O4JpZznmBk.jpg",
    category: "Sinema",
    source: "TEST",
    popularity: 85.7,
    gender: "Kadın",
    knownFor: "Acting"
  },
  {
    id: 5,
    name: "Tom Hanks",
    image: "https://image.tmdb.org/t/p/w500/a14CNByTYALAPSuci4drfhobpBu.jpg",
    category: "Sinema",
    source: "TEST",
    popularity: 88.9,
    gender: "Erkek",
    knownFor: "Acting"
  },
  {
    id: 6,
    name: "Jennifer Lawrence",
    image: "https://image.tmdb.org/t/p/w500/k6l8BWX1yqfGt95enzEkHoPvON4.jpg",
    category: "Sinema",
    source: "TEST",
    popularity: 87.3,
    gender: "Kadın",
    knownFor: "Acting"
  },
  {
    id: 7,
    name: "Chris Evans",
    image: "https://image.tmdb.org/t/p/w500/3bOGNsHlrswhyW79uvIHH1V43JI.jpg",
    category: "Sinema",
    source: "TEST",
    popularity: 84.6,
    gender: "Erkek",
    knownFor: "Acting"
  },
  {
    id: 8,
    name: "Margot Robbie",
    image: "https://image.tmdb.org/t/p/w500/euDPyqLnuwaWMHajcU3oZ9uZezR.jpg",
    category: "Sinema",
    source: "TEST",
    popularity: 91.4,
    gender: "Kadın",
    knownFor: "Acting"
  },
  {
    id: 9,
    name: "Ryan Reynolds",
    image: "https://image.tmdb.org/t/p/w500/2Orm6l3z3zukF1q0AgIOUqvwLeB.jpg",
    category: "Sinema",
    source: "TEST",
    popularity: 86.8,
    gender: "Erkek",
    knownFor: "Acting"
  },
  {
    id: 10,
    name: "Gal Gadot",
    image: "https://image.tmdb.org/t/p/w500/FejCCfVec4ej8pjUGGYtYhgDEF.jpg",
    category: "Sinema",
    source: "TEST",
    popularity: 83.2,
    gender: "Kadın",
    knownFor: "Acting"
  }
];

class PhotoService {
  constructor() {
    this.celebrities = [];
    this.currentPage = 1;
    this.totalPages = 1;
    this.apiError = false;
    this.useTestData = false;
  }

  // TMDB API çağrısı - popüler kişiler
  async fetchPopularPeople(page = 1) {
    try {
      // API key kontrolü
      if (!config.TMDB_API_KEY || config.TMDB_API_KEY === 'demo_key') {
        throw new Error('TMDB API key bulunamadı');
      }

      const response = await fetch(
        `${config.TMDB_BASE_URL}/person/popular?api_key=${config.TMDB_API_KEY}&page=${page}&language=tr-TR`
      );

      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
      }

      const data = await response.json();
      this.apiError = false; // API başarılı
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('TMDB API Error:', error);
      this.apiError = true; // API hatası var
      this.useTestData = true; // Test verisine geç
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  }

  // TMDB verisini uygulama formatına çevir
  transformTMDBPerson(person, details = null) {
    const profileImage = person.profile_path
      ? `${config.TMDB_IMAGE_BASE_URL}${person.profile_path}`
      : null;

    return {
      id: person.id,
      name: person.name,
      image: profileImage,
      category: this.getCategoryFromKnownFor(person.known_for || []),
      source: 'TMDB',
      popularity: person.popularity || 0,
      gender: person.gender === 1 ? 'Kadın' : person.gender === 2 ? 'Erkek' : 'Belirtilmemiş',
      knownFor: person.known_for_department || 'Bilinmeyen',
      // Detaylar varsa ekle
      ...(details && {
        biography: details.biography || '',
        birthday: details.birthday || '',
        deathday: details.deathday || null,
        placeOfBirth: details.place_of_birth || '',
        homepage: details.homepage || '',
      }),
    };
  }

  // Bilinen yapıtlardan kategori belirle
  getCategoryFromKnownFor(knownFor) {
    if (!knownFor || knownFor.length === 0) return 'Genel';

    const mediaTypes = knownFor.map(item => item.media_type);

    if (mediaTypes.includes('movie')) return 'Sinema';
    if (mediaTypes.includes('tv')) return 'Televizyon';
    if (mediaTypes.includes('person')) return 'Ünlü';

    return 'Genel';
  }

  // Test verilerini getir
  getTestData(page = 1, category = null) {
    const itemsPerPage = 4;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    let filteredData = TEST_CELEBRITIES;
    if (category && category !== 'Genel') {
      filteredData = TEST_CELEBRITIES.filter(person => person.category === category);
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
  }

  // API durumunu kontrol et
  hasApiError() {
    return this.apiError;
  }

  // Ana fotoğraf getirme metodu
  async getPhotos(category = null) {
    try {
      let response;

      // Önce TMDB API'yi dene, hata varsa test verisine geç
      if (!this.useTestData) {
        response = await this.fetchPopularPeople(this.currentPage);

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
        this.totalPages = response.data.total_pages;

        // TMDB verilerini transform et (test verisi zaten uygun formatta)
        let transformedPeople;
        if (response.data.results[0]?.source === 'TEST') {
          // Test verisi, transform etme
          transformedPeople = response.data.results;
        } else {
          // TMDB verisi, transform et
          transformedPeople = response.data.results
            .filter(person => person.profile_path)
            .map(person => this.transformTMDBPerson(person));
        }

        // Kategori filtresi varsa uygula (sadece TMDB verileri için)
        let filteredPeople = transformedPeople;
        if (category && category !== 'Genel' && response.data.results[0]?.source !== 'TEST') {
          filteredPeople = transformedPeople.filter(person => person.category === category);
        }

        this.celebrities = [...this.celebrities, ...filteredPeople];

        return {
          success: true,
          data: filteredPeople,
          pagination: {
            currentPage: this.currentPage,
            totalPages: this.totalPages,
            hasMore: this.currentPage < this.totalPages,
          },
          usingTestData: this.useTestData,
          apiError: this.apiError,
        };
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
      const response = await this.getPhotos();
      const photos = response.data.filter(photo => !excludeIds.includes(photo.id));

      if (photos.length < 2) {
        // Daha fazla veri yükle
        this.currentPage++;
        const moreResponse = await this.getPhotos();
        const morePhotos = moreResponse.data.filter(photo => !excludeIds.includes(photo.id));
        photos.push(...morePhotos);
      }

      if (photos.length < 2) {
        return {
          success: false,
          error: 'Yeterli fotoğraf bulunamadı',
          data: null,
        };
      }

      const shuffled = [...photos].sort(() => 0.5 - Math.random());

      return {
        success: true,
        data: [shuffled[0], shuffled[1]],
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  }

  // Seçimi kaydet
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

  // Cache temizle
  clearCache() {
    this.celebrities = [];
    this.currentPage = 1;
    this.totalPages = 1;
    this.apiError = false;
    this.useTestData = false;
  }

  // Daha fazla veri yükle
  async loadMore() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      return await this.getPhotos();
    }
    return {
      success: false,
      error: 'Daha fazla veri yok',
      data: [],
      usingTestData: this.useTestData,
      apiError: this.apiError,
    };
  }
}

const photoService = new PhotoService();

export default photoService;
