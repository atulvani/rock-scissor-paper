export type RockHandType = 'ROCK';
export type ScissorHandType = 'SCISSOR';
export type PaperHandType = 'PAPER';
export type HandType = RockHandType | ScissorHandType | PaperHandType;

export type PlayerType = string;
export type HighScore = { winner: PlayerType; losser: PlayerType; score: number; datetime: number; };

export type ReadyGameStateType = 'READY';
export type PlayingGameStateType = 'PLAYING';
export type FinishedGameStateType = 'FINISHED';

export type ReadyGameState = {
    state: ReadyGameStateType;
};

export type Player1WonMatchState = 'PLAYER1_WON';
export type Player2WonMatchState = 'PLAYER2_WON';
export type DrawMatchState = 'DRAW';
export type StillPlayingMatchState = 'STILL_PLATING';

export type PlayingGameState = {
    matchId: number;
    state: PlayingGameStateType;
    player1: PlayerType;
    player2: PlayerType;
    player1Wins: number;
    player2Wins: number;
    player1Hand: HandType | null;
    player2Hand: HandType | null;
    matchState: Player1WonMatchState | Player2WonMatchState | DrawMatchState | StillPlayingMatchState;
};

export type FinishedGameState = {
    state: FinishedGameStateType;
    winner: PlayerType | null;
    wins: number;
    losses: number;
};

export type GameState =
    | ReadyGameState
    | PlayingGameState
    | FinishedGameState;
