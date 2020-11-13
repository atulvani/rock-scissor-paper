import { AppState } from './types';
import { GAME_STATE, MATCH_STATE } from '../constants';
import { PlayerType } from '../types';

export const getHighScores = (appState: AppState) => {
    return appState.highScores;
};

export const getPlayer = (appState: AppState) => {
    return appState.player;
};

export const getGameStateType = (appState: AppState) => {
    return appState.game.state;
};

export const getWinner = (appState: AppState) => {
    return appState.game.state === GAME_STATE.FINISHED ? appState.game.winner : null;
};

export const getWins = (appState: AppState) => {
    return appState.game.state === GAME_STATE.FINISHED ? appState.game.wins : 0;
};

export const getLosses = (appState: AppState) => {
    return appState.game.state === GAME_STATE.FINISHED ? appState.game.losses : 0;
};

export const getPlayer1 = (appState: AppState) => {
    return appState.game.state === GAME_STATE.PLAYING ? appState.game.player1 : '_NA_';
};

export const getPlayer2 = (appState: AppState) => {
    return appState.game.state === GAME_STATE.PLAYING ? appState.game.player2 : '_NA_';
};

export const getMatchId = (appState: AppState) => {
    return appState.game.state === GAME_STATE.PLAYING ? appState.game.matchId : null;
};

export const getPlayerWins = (player: PlayerType) => (appState: AppState) => {
    if (appState.game.state === GAME_STATE.PLAYING) {
        return appState.game.player1 === player ? appState.game.player1Wins : appState.game.player2Wins;
    } else {
        return null;
    }
};

export const getMatchState = (appState: AppState) => {
    return (appState.game.state === GAME_STATE.PLAYING) ? appState.game.matchState : null;
};

export const getHasMatchEnded = (appState: AppState) => {
    return getMatchState(appState) !== MATCH_STATE.STILL_PLATING;
};

export const getIsPlayerWinning = (player: PlayerType) => (appState: AppState) => {
    if (appState.game.state === GAME_STATE.PLAYING) {
        if (appState.game.player1 === player) {
            return appState.game.player1Wins > appState.game.player2Wins;
        } else {
            return appState.game.player2Wins > appState.game.player1Wins;
        }
    } else {
        return false;
    }
};

export const getPlayerHand = (player: PlayerType) => (appState: AppState) => {
    if (appState.game.state === GAME_STATE.PLAYING) {
        return appState.game.player1 === player ? appState.game.player1Hand : appState.game.player2Hand;
    } else {
        return null;
    }
};
