import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Player } from './Player';
import { endGame } from '../redux/actionCreators';
import * as actionTypes from '../redux/actionTypes';
import { getPlayer1, getPlayer2, getHasMatchEnded } from '../redux/selectors';

export const Arena = () => {
    const dispatch = useDispatch();
    const player1 = useSelector(getPlayer1);
    const player2 = useSelector(getPlayer2);
    const hasMatchEnded = useSelector(getHasMatchEnded);
    return <div className="arena-wrapper">
        <div className="arena">
            <Player player={player1} />
            <div className="divider" />
            <Player player={player2} />
        </div>
        <div className="cta">
            {hasMatchEnded && <button onClick={() => dispatch({ type: actionTypes.REMATCH })}>Re-match</button>}
            <button onClick={() => dispatch(endGame())}>End Game</button>
        </div>
    </div>;
};
