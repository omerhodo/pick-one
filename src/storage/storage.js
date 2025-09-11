import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';

/**
 * Kullanıcı seçimlerini sakla
 */
export const saveSelection = async (selection) => {
  try {
    const existingSelections = await getSelections();
    const newSelections = [...existingSelections, selection];
    await AsyncStorage.setItem(STORAGE_KEYS.USER_SELECTIONS, JSON.stringify(newSelections));
    return true;
  } catch (error) {
    console.error('Seçim kaydedilirken hata:', error);
    return false;
  }
};

export const getSelections = async () => {
  try {
    const selections = await AsyncStorage.getItem(STORAGE_KEYS.USER_SELECTIONS);
    return selections ? JSON.parse(selections) : [];
  } catch (error) {
    console.error('Seçimler getirilirken hata:', error);
    return [];
  }
};

export const saveSeenPhotos = async (photoIds) => {
  try {
    const existingSeenPhotos = await getSeenPhotos();
    const newSeenPhotos = [...new Set([...existingSeenPhotos, ...photoIds])];
    await AsyncStorage.setItem(STORAGE_KEYS.SEEN_PHOTOS, JSON.stringify(newSeenPhotos));
    return true;
  } catch (error) {
    console.error('Görülen fotoğraflar kaydedilirken hata:', error);
    return false;
  }
};

export const getSeenPhotos = async () => {
  try {
    const seenPhotos = await AsyncStorage.getItem(STORAGE_KEYS.SEEN_PHOTOS);
    return seenPhotos ? JSON.parse(seenPhotos) : [];
  } catch (error) {
    console.error('Görülen fotoğraflar getirilirken hata:', error);
    return [];
  }
};

export const saveStats = async (stats) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(stats));
    return true;
  } catch (error) {
    console.error('İstatistikler kaydedilirken hata:', error);
    return false;
  }
};

export const getStats = async () => {
  try {
    const stats = await AsyncStorage.getItem(STORAGE_KEYS.USER_STATS);
    return stats ? JSON.parse(stats) : null;
  } catch (error) {
    console.error('İstatistikler getirilirken hata:', error);
    return null;
  }
};

export const clearAllData = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.USER_SELECTIONS,
      STORAGE_KEYS.USER_STATS,
    ]);
    return true;
  } catch (error) {
    console.error('Veriler temizlenirken hata:', error);
    return false;
  }
};
