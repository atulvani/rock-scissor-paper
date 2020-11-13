import { GAME_STATE } from '../constants';

export const defaultState = {
    game: {
        state: GAME_STATE.READY,
    },
    highScores: [],
    player: null,
};
