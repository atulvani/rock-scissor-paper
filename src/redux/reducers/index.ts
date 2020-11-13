import {combineReducers} from 'redux';
import { gameStateReducer } from './gameStateReducer';
import { highScoresReducer } from './highScoresReducer';
import { playerReducer } from './playerReducer';

export const rootReducer = combineReducers({
  game: gameStateReducer,
  highScores: highScoresReducer,
  player: playerReducer,
});
