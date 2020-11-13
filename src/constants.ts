import type {
    DrawMatchState,
    FinishedGameStateType,
    PaperHandType,
    Player1WonMatchState,
    Player2WonMatchState,
    PlayingGameStateType,
    ReadyGameStateType,
    RockHandType,
    StillPlayingMatchState,
    ScissorHandType,
} from './types';

export const GAME_STATE: {
    READY: ReadyGameStateType;
    PLAYING: PlayingGameStateType;
    FINISHED: FinishedGameStateType;
} = {
    READY: 'READY',
    PLAYING: 'PLAYING',
    FINISHED: 'FINISHED',
};

export const C3POAiPlayer = 'C-3PO';
export const R2D2AiPlayer = 'R2-D2';

export const HAND_TYPE: {
    ROCK: RockHandType;
    SCISSOR: ScissorHandType;
    PAPER: PaperHandType;
} = {
    ROCK: 'ROCK',
    SCISSOR: 'SCISSOR',
    PAPER: 'PAPER',
};

export const MATCH_STATE: {
    PLAYER1_WON: Player1WonMatchState;
    PLAYER2_WON: Player2WonMatchState;
    DRAW: DrawMatchState;
    STILL_PLATING: StillPlayingMatchState;
} = {
    PLAYER1_WON: 'PLAYER1_WON',
    PLAYER2_WON: 'PLAYER2_WON',
    DRAW: 'DRAW',
    STILL_PLATING: 'STILL_PLATING',
};

export const LOCAL_STORAGE_HIGH_SCORES_KEY = 'HIGH_SCORES';
export const MAX_HIGH_SCORES_TO_PERSIST = 5;
