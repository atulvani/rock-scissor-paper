import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actionTypes from '../redux/actionTypes';
import { getWinner, getWins, getLosses } from '../redux/selectors';

export const GameStats = () => {
    const dispatch = useDispatch();
    const winner = useSelector(getWinner);
    const wins = useSelector(getWins);
    const losses = useSelector(getLosses);
    return <div className="game-stats">
        {
            winner
                ? <>
                    <h1>{winner} won!</h1>
                    <p>Wins/Losses: {wins}/{losses}</p>
                </>
                : <h1>It's a draw!</h1>
        }
        <button onClick={() => dispatch({ type: actionTypes.DISMISS_GAME_RESULTS })}>Go Back</button>
    </div>;
};
