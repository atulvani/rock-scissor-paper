import React from 'react';
import { PlayerType } from '../types';

export const Avatar = ({ player }: { player: PlayerType | null }) => {
    return <div className="avatar">{player ? player[0] : '?'}</div>;
};
