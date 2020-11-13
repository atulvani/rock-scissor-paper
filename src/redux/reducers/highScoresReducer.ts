import * as actionTypes from '../actionTypes';
import { defaultState } from '../defaultState';
import { ActionTypes } from '../types';
import { HighScore } from '../../types';

export const highScoresReducer: (state: HighScore[] | undefined, action: ActionTypes) => HighScore[]
    = (state = defaultState.highScores, action: ActionTypes) => {
        switch (action.type) {
            case actionTypes.SCORES_LOADED:
                return action.payload;
            default:
                return state;
        }
    };
