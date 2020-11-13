import * as actionTypes from '../actionTypes';
import { defaultState } from '../defaultState';
import { ActionTypes } from '../types';
import { GAME_STATE, C3POAiPlayer, R2D2AiPlayer, MATCH_STATE } from '../../constants';
import { GameState } from '../../types';
import { isWinningHand, getWinner } from '../../utils';

export const gameStateReducer: (state: GameState | undefined, action: ActionTypes) => GameState
    = (state = defaultState.game, action: ActionTypes) => {
        switch (action.type) {
            case actionTypes.WATCH_GAME_MODE_SELECTED:
                return {
                    matchId: Math.random(),
                    state: GAME_STATE.PLAYING,
                    player1: C3POAiPlayer,
                    player2: R2D2AiPlayer,
                    player1Wins: 0,
                    player2Wins: 0,
                    player1Hand: null,
                    player2Hand: null,
                    matchState: MATCH_STATE.STILL_PLATING,
                };
            case actionTypes.PLAY_GAME_MODE_SELECTED:
                return {
                    matchId: Math.random(),
                    state: GAME_STATE.PLAYING,
                    player1: action.payload,
                    player2: (Math.random() < .5 ? C3POAiPlayer : R2D2AiPlayer), // not pure
                    player1Wins: 0,
                    player2Wins: 0,
                    player1Hand: null,
                    player2Hand: null,
                    matchState: MATCH_STATE.STILL_PLATING,
                };
            case actionTypes.PLAYER_MADE_UP_MIND: {
                if (state.state === GAME_STATE.PLAYING && state.matchState === MATCH_STATE.STILL_PLATING) {
                    const player1Hand = action.payload.player === state.player1 ? action.payload.hand : state.player1Hand;
                    const player2Hand = action.payload.player === state.player2 ? action.payload.hand : state.player2Hand;
                    let matchState;
                    let player1Wins = state.player1Wins;
                    let player2Wins = state.player2Wins;
                    if (!player1Hand || !player2Hand) {
                        matchState = MATCH_STATE.STILL_PLATING;
                    } else if (isWinningHand(player1Hand, player2Hand)) {
                        matchState = MATCH_STATE.PLAYER1_WON;
                        player1Wins++;
                    } else if (isWinningHand(player2Hand, player1Hand)) {
                        matchState = MATCH_STATE.PLAYER2_WON;
                        player2Wins++;
                    } else {
                        matchState = MATCH_STATE.DRAW;
                    }
                    return { ...state, matchState, player1Hand, player1Wins, player2Hand, player2Wins };
                } else {
                    return state;
                }
            }
            case actionTypes.REMATCH: {
                if (state.state === GAME_STATE.PLAYING) {
                    return {
                        ...state,
                        matchId: Math.random(),
                        matchState: MATCH_STATE.STILL_PLATING,
                        player1Hand: null,
                        player2Hand: null,
                    };
                } else {
                    return state;
                }
            }
            case actionTypes.GAME_ENDED: {
                if (state.state === GAME_STATE.PLAYING) {
                    const winner = getWinner(state);
                    return {
                        state: GAME_STATE.FINISHED,
                        winner,
                        wins: winner === state.player1 ? state.player1Wins : state.player2Wins,
                        losses: winner === state.player1 ? state.player2Wins : state.player1Wins,
                    };
                } else {
                    return state;
                }
            }
            case actionTypes.DISMISS_GAME_RESULTS:
                return { state: GAME_STATE.READY };
            default:
                return state;
        }
    };
