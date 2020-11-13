import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HAND_TYPE } from '../constants';
import * as actionTypes from '../redux/actionTypes';
import { getPlayerHand, getHasMatchEnded } from '../redux/selectors';
import { HandType, PlayerType } from '../types';

export const HumanPlayerControls = ({ player }: { player: PlayerType }) => {
    const dispatch = useDispatch();
    const madeUpMind = (hand: HandType) => dispatch({ type: actionTypes.PLAYER_MADE_UP_MIND, payload: { player, hand } });
    const playerHand = useSelector(getPlayerHand(player));
    const playerHandOptions = Object.values(HAND_TYPE);
    const hasMatchEnded = useSelector(getHasMatchEnded);

    return <div className="player-controls human-player-controls">
        {playerHandOptions.map((hand) => {
            return <div
                key={hand}
                className={`player-control ${hand === playerHand ? 'selected' : ''} ${hasMatchEnded ? 'disabled' : ''}`}
                onClick={() => madeUpMind(hand)}
            >
                {hand}
            </div>;
        })}
    </div>;
};
