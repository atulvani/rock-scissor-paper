import * as actionTypes from './actionTypes';
import { AppThunk, PlayerMadeUpMindActionType } from './types';
import { GAME_STATE, HAND_TYPE, LOCAL_STORAGE_HIGH_SCORES_KEY, MAX_HIGH_SCORES_TO_PERSIST } from '../constants';
import { PlayerType } from '../types';
import { getWinner, swapIndexsOfArray } from '../utils';

export const makeUpMindForBot = (
    player: PlayerType
): AppThunk<PlayerMadeUpMindActionType> => (dispatch) => {
    const hand = [HAND_TYPE.ROCK, HAND_TYPE.SCISSOR, HAND_TYPE.PAPER][Math.round(Math.random() * 2)];

    setTimeout(() => {
        dispatch({ type: actionTypes.PLAYER_MADE_UP_MIND, payload: { player, hand } });
    }, (2000 * Math.random())); // random timeout between 0 to 2 seconds
};

export const endGame = (): AppThunk<any> => (dispatch, getState) => {
    const { game, highScores } = getState();

    if (game.state === GAME_STATE.PLAYING) {
        const winner = getWinner(game);
        if (winner) { // winner would be null when there's a draw; score would be 0, which isn't consider as high score
            const losser = game.player1 === winner ? game.player2 : game.player1;
            const score = winner === game.player1 ? game.player1Wins - game.player2Wins : game.player2Wins - game.player1Wins;
            const newHighScores = [...highScores, { winner, losser, score, datetime: Date.now() }];

            // put newly added high score at the correct spot
            let i = newHighScores.length - 1;
            while ((i > 0) && (newHighScores[i].score > newHighScores[i - 1].score)) {
                swapIndexsOfArray(newHighScores, i, i - 1);
                i--;
            }

            newHighScores.length = Math.min(MAX_HIGH_SCORES_TO_PERSIST, newHighScores.length);
            localStorage.setItem(LOCAL_STORAGE_HIGH_SCORES_KEY, JSON.stringify(newHighScores));
            dispatch({ type: actionTypes.SCORES_LOADED, payload: newHighScores });
        }

        dispatch({ type: actionTypes.GAME_ENDED });
    }
};
