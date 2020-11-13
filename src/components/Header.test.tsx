import React from 'react';
import { Header } from './Header';
import { fireEvent, render, screen } from '../testUtils';

test('renders view high scores button and calls showHighScores function on click', () => {
    const mockShowHighScores = jest.fn();
    render(<Header showHighScores={mockShowHighScores} />);
    expect(screen.getByText('View High Scores')).toBeInTheDocument();
    fireEvent.click(screen.getByText('View High Scores'));
    expect(mockShowHighScores).toHaveBeenCalledTimes(1);
});
