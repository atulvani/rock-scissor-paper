import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Arena } from './Arena';
import { GameStats } from './GameStats';
import { Header } from './Header';
import { HighScores } from './HighScores';
import { PlayGameOption } from './PlayGameOption';
import { WatchGameOption } from './WatchGameOption';
import { GAME_STATE } from '../constants';
import { getGameStateType } from '../redux/selectors';

export const Main = () => {
    const gameStateType = useSelector(getGameStateType);
    const [areHighScoresVisible, setAreHighScoresVisible] = useState(false);

    let Content;
    if (gameStateType === GAME_STATE.READY) {
        Content = <div className="game-options">
            <PlayGameOption />
            <div className="divider"/>
            <WatchGameOption />
        </div>;
    } else if (gameStateType === GAME_STATE.PLAYING) {
        Content = <Arena />;
    } else { // gameStateType === GAME_STATE.FINISHED
        Content = <GameStats />;
    }

    return <div className="main">
        <Header showHighScores={() => setAreHighScoresVisible(true)} />
        {areHighScoresVisible && (
            <div className="scores-wrapper">
                <button className="link" onClick={() => setAreHighScoresVisible(false)}>&times;</button>
                <header>High Scores</header>
                <HighScores />
            </div>
        )}
        <div className="content-wrapper">
            {Content}
        </div>
    </div>;
};
