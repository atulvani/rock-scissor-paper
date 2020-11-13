import React from 'react';

export const Header = ({ showHighScores }: { showHighScores: () => void }) => {
    return <header className="header">
        <button className="link" onClick={showHighScores}>View High Scores</button>
    </header>
};
