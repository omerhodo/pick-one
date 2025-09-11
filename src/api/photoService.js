import { SAMPLE_CELEBRITIES } from '../utils/constants';
class PhotoService {
  async getPhotos(category = null) {
    try {
      // Gelecekte API'den veri gelecek
      // return await apiClient.get('/photos', { params: { category } });

      // Şimdilik local veriler
      let photos = [...SAMPLE_CELEBRITIES];

      if (category) {
        photos = photos.filter(photo => photo.category === category);
      }

      return {
        success: true,
        data: photos,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: SAMPLE_CELEBRITIES,
      };
    }
  }

  async getRandomPair(excludeIds = []) {
    try {
      const response = await this.getPhotos();
      const photos = response.data.filter(photo => !excludeIds.includes(photo.id));

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

  async getPhoto(id) {
    try {
      const response = await this.getPhotos();
      const photo = response.data.find(p => p.id === id);

      if (!photo) {
        return {
          success: false,
          error: 'Fotoğraf bulunamadı',
          data: null,
        };
      }

      return {
        success: true,
        data: photo,
      };
    } catch (error) {
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
}

const photoService = new PhotoService();

export default photoService;
