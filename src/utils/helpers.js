// Yardımcı fonksiyonlar

/**
 * İki rastgele farklı fotoğraf seçer (geliştirilmiş algoritma)
 * keepWinner: true ise, currentWinner korunur ve sadece yeni rakip seçilir
 */
export const getRandomPair = (photos, excludeIds = [], selections = [], currentWinner = null) => {
  console.log(`🎯 getRandomPair: ${photos.length} fotoğraf, excludeIds=${excludeIds.length}, currentWinner=${currentWinner?.name}`);

  const availablePhotos = photos.filter(photo => !excludeIds.includes(photo.id));

  if (availablePhotos.length < 2) {
    console.log('❌ Yeterli fotoğraf yok:', availablePhotos.length);
    return null; // Yeterli fotoğraf yok
  }

  if (currentWinner) {
    const availableOpponents = availablePhotos.filter(photo => photo.id !== currentWinner.id);

    if (availableOpponents.length === 0) {
      console.log('❌ CurrentWinner için rakip bulunamadı');
      return null;
    }

    const randomOpponent = availableOpponents[Math.floor(Math.random() * availableOpponents.length)];
    console.log(`✅ CurrentWinner korundu: ${currentWinner.name} vs ${randomOpponent.name}`);

    return [currentWinner, randomOpponent];
  }

  const selectionCounts = {};
  selections.forEach(selection => {
    selectionCounts[selection.selectedId] = (selectionCounts[selection.selectedId] || 0) + 1;
    selectionCounts[selection.rejectedId] = (selectionCounts[selection.rejectedId] || 0) + 0.5;
  });

  const weightedPhotos = availablePhotos.map(photo => ({
    ...photo,
    weight: 1 / Math.max(1, selectionCounts[photo.id] || 0.1)
  }));

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

  console.log(`✅ İki yeni fotoğraf seçildi: ${firstPhoto.name} vs ${secondPhoto.name}`);

  return [firstPhoto, secondPhoto];
};

export const getNewOpponent = (winner, photos, usedOpponentIds = []) => {
  console.log(`🎯 getNewOpponent: Winner=${winner?.name} (ID: ${winner?.id})`);
  console.log(`📊 Kullanılan rakip ID'ler:`, usedOpponentIds);
  console.log(`📊 Toplam ${photos.length} fotoğraf mevcut`);

  const availableOpponents = photos.filter(
    photo => photo.id !== winner.id && !usedOpponentIds.includes(photo.id)
  );

  console.log(`✅ ${availableOpponents.length} uygun rakip bulundu`);

  if (availableOpponents.length === 0) {
    console.log('❌ Tüm rakipler tükendi, yeni veri gerekli');
    return null; // Tüm rakipler tükendi
  }

  // Rastgele yeni rakip seç
  const randomIndex = Math.floor(Math.random() * availableOpponents.length);
  const selectedOpponent = availableOpponents[randomIndex];

  console.log(`🎲 Yeni rakip seçildi: ${selectedOpponent?.name} (ID: ${selectedOpponent?.id})`);

  return selectedOpponent;
};

export const getUsedOpponents = (winnerId, selections) => {
  return selections
    .filter(selection => selection.selectedId === winnerId)
    .map(selection => selection.rejectedId);
};

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export const calculatePercentage = (part, total) => {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
};

export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

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
