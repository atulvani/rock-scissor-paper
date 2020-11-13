import React from 'react';
import { useDispatch } from 'react-redux';
import { Avatar } from './Avatar';
import { C3POAiPlayer, R2D2AiPlayer } from '../constants';
import * as actionTypes from '../redux/actionTypes';

export const WatchGameOption = () => {
    const dispatch = useDispatch();
    return <div className="game-option watch-game-option">
        <div className="avatars">
            <Avatar player={C3POAiPlayer} />
            <Avatar player={R2D2AiPlayer} />
        </div>
        <button type="button" onClick={() => dispatch({ type: actionTypes.WATCH_GAME_MODE_SELECTED })}>Watch {C3POAiPlayer} and {R2D2AiPlayer} play</button>
    </div>;
};
