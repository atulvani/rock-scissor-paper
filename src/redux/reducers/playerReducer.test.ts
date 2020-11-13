import { playerReducer as reducer } from './playerReducer';
import * as actionTypes from '../actionTypes';
import { ActionTypes } from '../types';

const initAction: ActionTypes = {};

describe('playerReducer', () => {
    test('should return the initial state', () => {
        expect(reducer(undefined, initAction)).toEqual(null);
    });

    test('should handle PLAYER_IDENTIFIED', () => {
        const initialState = reducer(undefined, initAction);

        expect(
            reducer(initialState, { type: actionTypes.PLAYER_IDENTIFIED, payload: 'John' })
        ).toEqual('John');

        expect(
            reducer(initialState, { type: actionTypes.PLAYER_IDENTIFIED, payload: 'Jane' })
        ).toEqual('Jane');
    });
})