import * as actionTypes from '../actionTypes';
import { defaultState } from '../defaultState';
import { ActionTypes } from '../types';
import { PlayerType } from '../../types';

export const playerReducer: (state: PlayerType | null | undefined, action: ActionTypes) => PlayerType | null
    = (state = defaultState.player, action: ActionTypes) => {
        switch (action.type) {
            case actionTypes.PLAYER_IDENTIFIED:
                return action.payload;
            default:
                return state;
        }
    };
