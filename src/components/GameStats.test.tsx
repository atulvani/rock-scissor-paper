import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { GameStats } from './GameStats';
import { GAME_STATE } from '../constants';
import * as actionTypes from '../redux/actionTypes';
import { AppState } from '../redux/types';
import { fireEvent, render, screen } from '../testUtils';
import { FinishedGameState } from '../types';

const mockStore = configureMockStore<AppState>([thunk]);
const player  = 'John';

describe('GameStats', () => {
    let game: FinishedGameState;
    beforeEach(() => {
        game = { state: GAME_STATE.FINISHED, winner: player, wins: 10, losses: 5 };
    });

    test('render game stats when the player won', () => {
        const initialState = { game, highScores: [], player };
        const store = mockStore(initialState);
        render(<GameStats />, { initialState, store });
        expect(screen.getByText(`${player} won!`)).toBeInTheDocument();
        expect(screen.getByText(`Wins/Losses: ${game.wins}/${game.losses}`)).toBeInTheDocument();
    });

    test('render game stats when it was a draw', () => {
        game.winner = null;
        const initialState = { game, highScores: [], player };
        const store = mockStore(initialState);
        render(<GameStats />, { initialState, store });
        expect(screen.getByText("It's a draw!")).toBeInTheDocument();
    });

    test('render the go back button', () => {
        const initialState = { game, highScores: [], player };
        const store = mockStore(initialState);
        render(<GameStats />, { initialState, store });
        expect(screen.getByText('Go Back')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Go Back'));
        expect(store.getActions()).toEqual([{ type: actionTypes.DISMISS_GAME_RESULTS }]);
    });
});