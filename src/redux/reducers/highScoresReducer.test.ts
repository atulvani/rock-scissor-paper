import { highScoresReducer as reducer } from './highScoresReducer';
import * as actionTypes from '../actionTypes';
import { ActionTypes } from '../types';

const initAction: ActionTypes = {};

describe('highScoresReducer', () => {
    test('should return the initial state', () => {
        expect(reducer(undefined, initAction)).toEqual([]);
    });

    test('should handle SCORES_LOADED', () => {
        const newHighScores = [
            { winner: 'Alpha', losser: 'Bravo', score: 7, datetime: Number(new Date('10/20/2020')) },
            { winner: 'Charlie', losser: 'Dave', score: 5, datetime: Number(new Date('10/25/2020')) },
        ];

        const initialState = reducer(undefined, initAction);

        expect(
            reducer(
                initialState,
                {
                    type: actionTypes.SCORES_LOADED,
                    payload: newHighScores,
                }
            )
        ).toEqual(newHighScores);
    });
})