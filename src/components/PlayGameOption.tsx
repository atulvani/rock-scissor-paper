import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from './Avatar';
import * as actionTypes from '../redux/actionTypes';
import { getPlayer } from '../redux/selectors';

export const PlayGameOption = () => {
    const dispatch = useDispatch();
    const player = useSelector(getPlayer);
    const setPlayer = (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: actionTypes.PLAYER_IDENTIFIED, payload: e.target.value });
    const playGame = () => dispatch({ type: actionTypes.PLAY_GAME_MODE_SELECTED, payload: player });
    return <div className="game-option">
        <Avatar player={player} />
        <input type="text" placeholder="Enter your name..." value={player || ''} onChange={setPlayer} />
        {player && <button type="button" onClick={playGame}>play as {player}</button>}
    </div>;
};
