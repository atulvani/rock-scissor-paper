import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HAND_TYPE } from '../constants';
import { makeUpMindForBot } from '../redux/actionCreators';
import { getHasMatchEnded, getPlayerHand } from '../redux/selectors';
import { PlayerType } from '../types';

export const BotPlayerControls = ({ player }: { player: PlayerType }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(makeUpMindForBot(player));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const [animOnlyPlayerHandIndex, setAnimOnlyPlayerHandIndex] = useState(0);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setAnimOnlyPlayerHandIndex((animOnlyPlayerHandIndex + 1) % playerHandOptions.length)
        }, 150);
        return () => clearInterval(intervalId);
    }); // eslint-disable-line react-hooks/exhaustive-deps
    
    const playerHandOptions = Object.values(HAND_TYPE);
    let playerHand = useSelector(getPlayerHand(player));
    let selectedHandIndex: number;
    if (useSelector(getHasMatchEnded)) {
        selectedHandIndex = playerHand ? playerHandOptions.indexOf(playerHand) : -1; // ts hack
    } else {
        selectedHandIndex = animOnlyPlayerHandIndex;
    }

return <div className="player-controls">
        {playerHandOptions.map((hand, index) => {
            return <div
                key={hand}
                className={`player-control disabled ${index === selectedHandIndex ? 'selected' : ''}`}>
                {hand}
            </div>;
        })}
    </div>;
};
