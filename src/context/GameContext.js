import { createContext, useContext, useEffect, useReducer } from 'react';
import { getSelections, getStats, saveSelection, saveStats } from '../storage/storage';
import { SAMPLE_CELEBRITIES } from '../utils/constants';
import { calculateStats } from '../utils/helpers';

const initialState = {
  photos: SAMPLE_CELEBRITIES,
  currentPair: null,
  selections: [],
  stats: null,
  loading: false,
  error: null,
  gameStarted: false,
  currentWinner: null,
};

const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  LOAD_DATA_SUCCESS: 'LOAD_DATA_SUCCESS',
  SET_CURRENT_PAIR: 'SET_CURRENT_PAIR',
  ADD_SELECTION: 'ADD_SELECTION',
  UPDATE_STATS: 'UPDATE_STATS',
  START_GAME: 'START_GAME',
  RESET_GAME: 'RESET_GAME',
  SET_CURRENT_WINNER: 'SET_CURRENT_WINNER',
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
        loading: false,
      };

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
      };

    case ActionTypes.SET_CURRENT_WINNER:
      return { ...state, currentWinner: action.payload };

    case ActionTypes.RESET_GAME:
      return {
        ...initialState,
        photos: state.photos,
      };

    default:
      return state;
  }
};

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const loadData = async () => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });

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
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
      return false;
    }
  };

  const startGame = () => {
    dispatch({ type: ActionTypes.START_GAME });
    dispatch({ type: ActionTypes.SET_CURRENT_PAIR, payload: null });
  };

  const resetGame = async () => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const { clearAllData } = await import('../storage/storage');
      await clearAllData();

      dispatch({ type: ActionTypes.RESET_GAME });

      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      return true;
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
      return false;
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const value = {
    photos: state.photos,
    currentPair: state.currentPair,
    selections: state.selections,
    stats: state.stats,
    loading: state.loading,
    error: state.error,
    gameStarted: state.gameStarted,
    currentWinner: state.currentWinner,

    setCurrentPair,
    setCurrentWinner,
    makeSelection,
    startGame,
    resetGame,
    loadData,
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
