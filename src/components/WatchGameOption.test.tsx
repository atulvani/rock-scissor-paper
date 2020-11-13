import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { WatchGameOption } from './WatchGameOption';
import { C3POAiPlayer, GAME_STATE, R2D2AiPlayer } from '../constants';
import * as actionTypes from '../redux/actionTypes';
import { AppState } from '../redux/types';
import { fireEvent, render, screen } from '../testUtils';

const mockStore = configureMockStore<AppState>([thunk]);

test('dispatches WATCH_GAME_MODE_SELECTED when cta clicked', () => {
    const initialState = { game: { state: GAME_STATE.READY }, highScores: [], player: null };
    const store = mockStore(initialState);
    render(<WatchGameOption />, { initialState, store });
    fireEvent.click(screen.getByText(`Watch ${C3POAiPlayer} and ${R2D2AiPlayer} play`));
    expect(store.getActions()).toEqual([{ type: actionTypes.WATCH_GAME_MODE_SELECTED }]);
});

test('renders avatars for both the ai players and the cta button', () => {
    const { baseElement: elt } = render(<WatchGameOption />);
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('R')).toBeInTheDocument();
    expect(elt.querySelector('button')?.textContent).toBe(`Watch ${C3POAiPlayer} and ${R2D2AiPlayer} play`);
});
