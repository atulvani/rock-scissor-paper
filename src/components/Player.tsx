import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from './Avatar';
import { BotPlayerControls } from './BotPlayerControls';
import { HumanPlayerControls } from './HumanPlayerControls';
import { getMatchId, getPlayerWins, getIsPlayerWinning } from '../redux/selectors';
import { PlayerType } from '../types';
import { isBotPlayer } from '../utils';

export const Player = ({ player }: { player: PlayerType }) => {
    const matchId = useSelector(getMatchId);
    const wins = useSelector(getPlayerWins(player));
    const isWinning = useSelector(getIsPlayerWinning(player));
    return <div className="arena-player-view">
        <p>{isWinning && 'Winning!'} Wins: {wins}</p>
        <Avatar player={player} />
        {
            isBotPlayer(player)
                ? <BotPlayerControls player={player} key={matchId} />
                : <HumanPlayerControls player={player} key={matchId} />
        }
    </div>;
};
