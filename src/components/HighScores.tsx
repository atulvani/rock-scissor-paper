import React from 'react';
import { useSelector } from 'react-redux';
import { getHighScores } from '../redux/selectors';

export const HighScores = () => {
    const highScores = useSelector(getHighScores);
    return <table cellSpacing="0">
        <thead>
            <tr>
                <td>Rank</td>
                <td>Winner</td>
                <td>Losser</td>
                <td className="right">Score</td>
                <td className="right">Date</td>
            </tr>
        </thead>
        <tbody>
            {highScores.map((score, index) => {
                const dateObject = new Date(score.datetime);
                return <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{score.winner}</td>
                    <td>{score.losser}</td>
                    <td className="right">{score.score}</td>
                    <td className="right">{dateObject.toLocaleDateString()} {dateObject.toLocaleTimeString()}</td>
                </tr>;
            })}
        </tbody>
    </table>;
};
