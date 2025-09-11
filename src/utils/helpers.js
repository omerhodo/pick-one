// Yardımcı fonksiyonlar

/**
 * İki rastgele farklı fotoğraf seçer (geliştirilmiş algoritma)
 */
export const getRandomPair = (photos, excludeIds = [], selections = []) => {
  const availablePhotos = photos.filter(photo => !excludeIds.includes(photo.id));

  if (availablePhotos.length < 2) {
    return null; // Yeterli fotoğraf yok
  }

  // Seçim istatistiklerini hesapla
  const selectionCounts = {};
  selections.forEach(selection => {
    selectionCounts[selection.selectedId] = (selectionCounts[selection.selectedId] || 0) + 1;
    selectionCounts[selection.rejectedId] = (selectionCounts[selection.rejectedId] || 0) + 0.5;
  });

  // Daha az seçilen fotoğrafları önceliklendir
  const weightedPhotos = availablePhotos.map(photo => ({
    ...photo,
    weight: 1 / Math.max(1, selectionCounts[photo.id] || 0.1)
  }));

  // Ağırlıklı rastgele seçim
  const selectWeightedRandom = (photos) => {
    const totalWeight = photos.reduce((sum, photo) => sum + photo.weight, 0);
    let random = Math.random() * totalWeight;

    for (let photo of photos) {
      random -= photo.weight;
      if (random <= 0) {
        return photo;
      }
    }
    return photos[photos.length - 1];
  };

  const firstPhoto = selectWeightedRandom(weightedPhotos);
  const remainingPhotos = weightedPhotos.filter(p => p.id !== firstPhoto.id);
  const secondPhoto = selectWeightedRandom(remainingPhotos);

  return [firstPhoto, secondPhoto];
};

/**
 * Turnuva sistemi için yeni rakip seçer
 * Kazanan kalır, yeni rakip gelir
 */
export const getNewOpponent = (winner, photos, usedOpponentIds = []) => {
  const availableOpponents = photos.filter(
    photo => photo.id !== winner.id && !usedOpponentIds.includes(photo.id)
  );

  if (availableOpponents.length === 0) {
    return null; // Tüm rakipler tükendi
  }

  // Rastgele yeni rakip seç
  const randomIndex = Math.floor(Math.random() * availableOpponents.length);
  return availableOpponents[randomIndex];
};

/**
 * Turnuva geçmişinden kullanılmış rakipleri çıkarır
 */
export const getUsedOpponents = (winnerId, selections) => {
  return selections
    .filter(selection => selection.selectedId === winnerId)
    .map(selection => selection.rejectedId);
};

/**
 * Rastgele sayı üretir
 */
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Tarihi formatlar
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

/**
 * Yüzde hesaplar
 */
export const calculatePercentage = (part, total) => {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
};

/**
 * Dizinin karışık halini döndürür
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * İstatistik hesaplama
 */
export const calculateStats = (selections) => {
  if (!selections || selections.length === 0) {
    return {
      totalSelections: 0,
      favoritePhoto: null,
      winRate: {},
    };
  }

  const selectionCounts = {};
  selections.forEach(selection => {
    selectionCounts[selection.selectedId] = (selectionCounts[selection.selectedId] || 0) + 1;
  });

  const favoritePhotoId = Object.keys(selectionCounts).reduce((a, b) =>
    selectionCounts[a] > selectionCounts[b] ? a : b
  );

  // Kazanma oranlarını hesapla
  const winRate = {};
  Object.keys(selectionCounts).forEach(photoId => {
    winRate[photoId] = calculatePercentage(selectionCounts[photoId], selections.length);
  });

  return {
    totalSelections: selections.length,
    favoritePhotoId,
    selectionCounts,
    winRate,
  };
};
