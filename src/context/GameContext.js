import { createContext, useContext, useEffect, useReducer } from 'react';
import photoService from '../api/photoService';
import { getSelections, getStats, saveSelection, saveStats } from '../storage/storage';
import { calculateStats } from '../utils/helpers';

const initialState = {
  photos: [],
  currentPair: null,
  selections: [],
  stats: null,
  loading: true,
  error: null,
  gameStarted: false,
  currentWinner: null,
  pagination: null,
  apiWarning: false,
  usingTestData: false,
};

const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  LOAD_DATA_SUCCESS: 'LOAD_DATA_SUCCESS',
  LOAD_PHOTOS_SUCCESS: 'LOAD_PHOTOS_SUCCESS',
  SET_CURRENT_PAIR: 'SET_CURRENT_PAIR',
  ADD_SELECTION: 'ADD_SELECTION',
  UPDATE_STATS: 'UPDATE_STATS',
  START_GAME: 'START_GAME',
  RESET_GAME: 'RESET_GAME',
  SET_CURRENT_WINNER: 'SET_CURRENT_WINNER',
  APPEND_PHOTOS: 'APPEND_PHOTOS',
  SET_API_WARNING: 'SET_API_WARNING',
  CLEAR_PHOTOS: 'CLEAR_PHOTOS',
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };

    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case ActionTypes.LOAD_DATA_SUCCESS:
      return {
        ...state,
        selections: action.payload.selections,
        stats: action.payload.stats,
      };

    case ActionTypes.LOAD_PHOTOS_SUCCESS:
      return {
        ...state,
        photos: action.payload.photos,
        pagination: action.payload.pagination,
        loading: false,
        error: null,
        apiWarning: action.payload.apiError || false,
        usingTestData: action.payload.usingTestData || false,
      };

    case ActionTypes.APPEND_PHOTOS:
      return {
        ...state,
        photos: [...state.photos, ...action.payload.photos],
        pagination: action.payload.pagination,
        apiWarning: action.payload.apiError || state.apiWarning,
        usingTestData: action.payload.usingTestData || state.usingTestData,
      };

    case ActionTypes.SET_API_WARNING:
      return { ...state, apiWarning: action.payload };

    case ActionTypes.SET_CURRENT_PAIR:
      return { ...state, currentPair: action.payload };

    case ActionTypes.ADD_SELECTION:
      return {
        ...state,
        selections: [...state.selections, action.payload],
      };

    case ActionTypes.UPDATE_STATS:
      return { ...state, stats: action.payload };

    case ActionTypes.START_GAME:
      return {
        ...state,
        gameStarted: true,
        selections: [],
        currentPair: null,
        currentWinner: null,
        photos: [],
      };

    case ActionTypes.SET_CURRENT_WINNER:
      return { ...state, currentWinner: action.payload };

    case ActionTypes.CLEAR_PHOTOS:
      return {
        ...state,
        photos: [],
        currentPair: null,
        currentWinner: null,
      };

    case ActionTypes.RESET_GAME:
      return {
        ...initialState,
        loading: true,
      };

    default:
      return state;
  }
};

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const loadPhotos = async (category = null) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });

      const photosResponse = await photoService.getPhotos(category);

      if (photosResponse.success) {
        dispatch({
          type: ActionTypes.LOAD_PHOTOS_SUCCESS,
          payload: {
            photos: photosResponse.data,
            pagination: photosResponse.pagination,
            apiError: photosResponse.apiError,
            usingTestData: photosResponse.usingTestData,
          },
        });
      } else {
        throw new Error(photosResponse.error || 'Fotoğraflar yüklenemedi');
      }
    } catch (error) {
      console.error('Load photos error:', error);
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
  };

  const loadMorePhotos = async () => {
    try {
      if (!state.pagination?.hasMore) return false;

      const response = await photoService.loadMore();

      if (response.success && response.data.length > 0) {
        dispatch({
          type: ActionTypes.APPEND_PHOTOS,
          payload: {
            photos: response.data,
            pagination: response.pagination,
            apiError: response.apiError,
            usingTestData: response.usingTestData,
          },
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Load more photos error:', error);
      return false;
    }
  };

  const loadData = async () => {
    try {
      const [selections, stats] = await Promise.all([
        getSelections(),
        getStats(),
      ]);

      dispatch({
        type: ActionTypes.LOAD_DATA_SUCCESS,
        payload: {
          selections,
          stats: stats || calculateStats(selections),
        },
      });
    } catch (error) {
      console.error('Load data error:', error);
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
  };

  const setCurrentPair = (pair) => {
    dispatch({ type: ActionTypes.SET_CURRENT_PAIR, payload: pair });
  };

  const setCurrentWinner = (winner) => {
    dispatch({ type: ActionTypes.SET_CURRENT_WINNER, payload: winner });
  };

  const makeSelection = async (selectedPhoto, rejectedPhoto) => {
    try {
      const selection = {
        selectedId: selectedPhoto.id,
        rejectedId: rejectedPhoto.id,
        selectedPhoto,
        rejectedPhoto,
        timestamp: Date.now(),
      };

      dispatch({ type: ActionTypes.ADD_SELECTION, payload: selection });

      await saveSelection(selection);

      const newSelections = [...state.selections, selection];
      const newStats = calculateStats(newSelections);

      dispatch({ type: ActionTypes.UPDATE_STATS, payload: newStats });
      await saveStats(newStats);

      return true;
    } catch (error) {
      console.error('Make selection error:', error);
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
      return false;
    }
  };

  const startGame = (gameSettings = {}) => {
    dispatch({ type: ActionTypes.START_GAME });
    dispatch({ type: ActionTypes.SET_CURRENT_PAIR, payload: null });

    if (gameSettings.category !== undefined || gameSettings.maxSelections !== undefined) {
      photoService.clearCache();
      loadPhotos(gameSettings.category);
    }
  };

  const resetGame = async () => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const { clearAllData } = await import('../storage/storage');
      await clearAllData();

      photoService.clearCache();

      dispatch({ type: ActionTypes.RESET_GAME });

      // Reload photos
      await loadPhotos();

      return true;
    } catch (error) {
      console.error('Reset game error:', error);
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
      return false;
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      await loadData();
    };

    initializeApp();
  }, []);

  const dismissApiWarning = () => {
    dispatch({ type: ActionTypes.SET_API_WARNING, payload: false });
  };

  const clearCache = () => {
    console.log('🧹 Photo cache + GameContext photos temizleniyor...');
    try {
      photoService.clearPhotoCache();
      console.log('✅ PhotoService cache temizlendi');

      if (dispatch) {
        dispatch({ type: ActionTypes.CLEAR_PHOTOS });
        console.log('✅ GameContext photos temizlendi');
      } else {
        console.warn('⚠️ dispatch fonksiyonu bulunamadı');
      }
    } catch (error) {
      console.error('❌ Cache temizleme hatası:', error);
    }
  };

  const resetCategoryFilter = () => {
    console.log('🔄 Category filter resetleniyor... (API isteği yok)');
    photoService.resetCategoryFilter();
  };

  const value = {
    photos: state.photos,
    currentPair: state.currentPair,
    selections: state.selections,
    stats: state.stats,
    loading: state.loading,
    error: state.error,
    gameStarted: state.gameStarted,
    currentWinner: state.currentWinner,
    pagination: state.pagination,
    apiWarning: state.apiWarning,
    usingTestData: state.usingTestData,

    setCurrentPair,
    setCurrentWinner,
    makeSelection,
    startGame,
    resetGame,
    loadData,
    loadPhotos,
    loadMorePhotos,
    dismissApiWarning,
    clearCache,
    resetCategoryFilter,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
