import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { HighScores } from './HighScores';
import { GAME_STATE } from '../constants';
import { AppState } from '../redux/types';
import { render } from '../testUtils';

const mockStore = configureMockStore<AppState>([thunk]);

test('renders high scores', () => {
    const highScores = [
        { winner: 'Alpha', losser: 'Bravo', score: 7, datetime: Number(new Date('10/20/2020')) },
        { winner: 'Charlie', losser: 'Dave', score: 5, datetime: Number(new Date('10/25/2020')) },
    ];
    const initialState = { game: { state: GAME_STATE.READY }, player: null, highScores };
    const store = mockStore(initialState);
    const { baseElement: elt } = render(<HighScores />, { initialState, store });
    expect(elt.querySelectorAll('tbody tr').length).toBe(2);
    expect(elt.querySelector('tbody tr:nth-child(1) td:nth-child(2)')?.textContent).toBe(highScores[0].winner);
    expect(elt.querySelector('tbody tr:nth-child(1) td:nth-child(3)')?.textContent).toBe(highScores[0].losser);
    expect(elt.querySelector('tbody tr:nth-child(1) td:nth-child(4)')?.textContent).toBe(String(highScores[0].score));
    expect(elt.querySelector('tbody tr:nth-child(2) td:nth-child(2)')?.textContent).toBe(highScores[1].winner);
    expect(elt.querySelector('tbody tr:nth-child(2) td:nth-child(3)')?.textContent).toBe(highScores[1].losser);
    expect(elt.querySelector('tbody tr:nth-child(2) td:nth-child(4)')?.textContent).toBe(String(highScores[1].score));
});
