import { ThunkAction } from 'redux-thunk';
import * as actionTypes from './actionTypes';
import { rootReducer } from './reducers/index';
import { HighScore, PlayerType, HandType } from '../types';

export type DismissGameResultsActionType = { type: typeof actionTypes.DISMISS_GAME_RESULTS };
export type MakeUpMindForBotActionType = { type: typeof actionTypes.MAKE_UP_MIND_FOR_BOT; payload: PlayerType; };
export type PlayerEndedGameActionType = { type: typeof actionTypes.GAME_ENDED; };
export type PlayerIdentifiedActionType = { type: typeof actionTypes.PLAYER_IDENTIFIED; payload: PlayerType; };
export type PlayerMadeUpMindActionType = { type: typeof actionTypes.PLAYER_MADE_UP_MIND; payload: { hand: HandType, player: PlayerType } };
export type PlayGameModeSelectedActionType = { type: typeof actionTypes.PLAY_GAME_MODE_SELECTED; payload: PlayerType; };
export type RematchActionType = { type: typeof actionTypes.REMATCH };
export type ScoresLoadedActionType = { type: typeof actionTypes.SCORES_LOADED; payload: HighScore[]; };
export type WatchGameModeSelectedActionType = { type: typeof actionTypes.WATCH_GAME_MODE_SELECTED };

export type ActionTypes =
    | DismissGameResultsActionType
    | MakeUpMindForBotActionType
    | PlayerEndedGameActionType
    | PlayerIdentifiedActionType
    | PlayerMadeUpMindActionType
    | PlayGameModeSelectedActionType
    | RematchActionType
    | ScoresLoadedActionType
    | WatchGameModeSelectedActionType;

export type AppState = ReturnType<typeof rootReducer>;

export type AppThunk<ActionTypes extends Action, ReturnType = void>
    = ThunkAction<ReturnType, AppState, unknown, ActionTypes>;
