import { gameStateReducer as reducer } from './gameStateReducer';
import * as actionTypes from '../actionTypes';
import { ActionTypes } from '../types';
import { GAME_STATE, C3POAiPlayer, R2D2AiPlayer, MATCH_STATE, HAND_TYPE } from '../../constants';
import { PlayingGameState } from '../../types';

const initAction: ActionTypes = {};
const MOCKED_RANDOM_NUMBER = 0.8;

describe('gameStateReducer', () => {
    beforeAll(() => {
        const mockMath = Object.create(global.Math);
        mockMath.random = () => MOCKED_RANDOM_NUMBER;
        global.Math = mockMath;
    });

    test('should return the initial state', () => {
        expect(reducer(undefined, initAction)).toEqual({ state: GAME_STATE.READY });
    });

    test('should handle WATCH_GAME_MODE_SELECTED', () => {
        const initialState = reducer(undefined, initAction);

        expect(
            reducer(initialState, { type: actionTypes.WATCH_GAME_MODE_SELECTED })
        ).toEqual({
            matchId: MOCKED_RANDOM_NUMBER,
            state: GAME_STATE.PLAYING,
            player1: C3POAiPlayer,
            player2: R2D2AiPlayer,
            player1Wins: 0,
            player2Wins: 0,
            player1Hand: null,
            player2Hand: null,
            matchState: MATCH_STATE.STILL_PLATING,
        });
    });

    test('should handle PLAY_GAME_MODE_SELECTED', () => {
        const initialState = reducer(undefined, initAction);
        const player = 'John';

        expect(
            reducer(initialState, { type: actionTypes.PLAY_GAME_MODE_SELECTED, payload: player })
        ).toEqual({
            matchId: MOCKED_RANDOM_NUMBER,
            state: GAME_STATE.PLAYING,
            player1: player,
            player2: R2D2AiPlayer,
            player1Wins: 0,
            player2Wins: 0,
            player1Hand: null,
            player2Hand: null,
            matchState: MATCH_STATE.STILL_PLATING,
        });
    });

    describe('PLAYER_MADE_UP_MIND', () => {
        test('should do nothing if the game is not in playing state', () => {
            const initialState = reducer(undefined, initAction);

            expect(
                reducer(
                    initialState,
                    { type: actionTypes.PLAYER_MADE_UP_MIND, payload: { player: R2D2AiPlayer, hand: HAND_TYPE.ROCK } },
                )
            ).toEqual(initialState);
        });

        test('should do nothing if the match is not in playing state', () => {
            const initialState = reducer(undefined, initAction);

            const playingGameState: PlayingGameState = reducer(initialState, { type: actionTypes.WATCH_GAME_MODE_SELECTED });
            const { player1, player2 } = playingGameState;

            const gameStateWithPlayer1Choice = reducer(
                playingGameState,
                { type: actionTypes.PLAYER_MADE_UP_MIND, payload: { player: player1, hand: HAND_TYPE.ROCK } },
            );

            const gameStateWithPlayer2Choice = reducer(
                gameStateWithPlayer1Choice,
                { type: actionTypes.PLAYER_MADE_UP_MIND, payload: { player: player2, hand: HAND_TYPE.ROCK } },
            );

            expect(
                reducer(
                    gameStateWithPlayer2Choice,
                    { type: actionTypes.PLAYER_MADE_UP_MIND, payload: { player: player1, hand: HAND_TYPE.PAPER } },
                )
            ).toEqual(gameStateWithPlayer2Choice);

            expect(
                reducer(
                    gameStateWithPlayer2Choice,
                    { type: actionTypes.PLAYER_MADE_UP_MIND, payload: { player: player2, hand: HAND_TYPE.PAPER } },
                )
            ).toEqual(gameStateWithPlayer2Choice);
        });

        test('should allow player1 to change mind if is the match is not finished yet', () => {
            const initialState = reducer(undefined, initAction);

            const playingGameState: PlayingGameState = reducer(initialState, { type: actionTypes.WATCH_GAME_MODE_SELECTED });
            const { player1 } = playingGameState;

            const gameStateWithPlayer1Choice = reducer(
                playingGameState,
                { type: actionTypes.PLAYER_MADE_UP_MIND, payload: { player: player1, hand: HAND_TYPE.ROCK } },
            );

            expect(
                reducer(
                    gameStateWithPlayer1Choice,
                    { type: actionTypes.PLAYER_MADE_UP_MIND, payload: { player: player1, hand: HAND_TYPE.PAPER } },
                )
            ).toMatchObject({ player1Hand: HAND_TYPE.PAPER });
        });

        test('should allow player2 to change mind if is the match is not finished yet', () => {
            const initialState = reducer(undefined, initAction);

            const playingGameState: PlayingGameState = reducer(initialState, { type: actionTypes.WATCH_GAME_MODE_SELECTED });
            const { player2 } = playingGameState;

            const gameStateWithPlayer2Choice = reducer(
                playingGameState,
                { type: actionTypes.PLAYER_MADE_UP_MIND, payload: { player: player2, hand: HAND_TYPE.ROCK } },
            );

            expect(
                reducer(
                    gameStateWithPlayer2Choice,
                    { type: actionTypes.PLAYER_MADE_UP_MIND, payload: { player: player2, hand: HAND_TYPE.PAPER } },
                )
            ).toMatchObject({ player2Hand: HAND_TYPE.PAPER });
        });

        test('should increment the win count if player1 wins the match', () => {
            const initialState = reducer(undefined, initAction);

            const playingGameState: PlayingGameState = reducer(initialState, { type: actionTypes.WATCH_GAME_MODE_SELECTED });
            const { player1, player2, player1Wins } = playingGameState;

            const gameStateWithPlayer1Choice = reducer(
                playingGameState,
                { type: actionTypes.PLAYER_MADE_UP_MIND, payload: { player: player1, hand: HAND_TYPE.ROCK } },
            );

            const gameStateWithPlayer2Choice = reducer(
                gameStateWithPlayer1Choice,
                { type: actionTypes.PLAYER_MADE_UP_MIND, payload: { player: player2, hand: HAND_TYPE.SCISSOR } },
            );

            expect(gameStateWithPlayer2Choice).toMatchObject({ matchState: MATCH_STATE.PLAYER1_WON });
            expect(gameStateWithPlayer2Choice).toMatchObject({ player1Wins: player1Wins + 1 });
        });

        test('should increment the win count if player2 wins the match', () => {
            const initialState = reducer(undefined, initAction);

            const playingGameState: PlayingGameState = reducer(initialState, { type: actionTypes.WATCH_GAME_MODE_SELECTED });
            const { player1, player2, player2Wins } = playingGameState;

            const gameStateWithPlayer1Choice = reducer(
                playingGameState,
                { type: actionTypes.PLAYER_MADE_UP_MIND, payload: { player: player1, hand: HAND_TYPE.PAPER } },
            );

            const gameStateWithPlayer2Choice = reducer(
                gameStateWithPlayer1Choice,
                { type: actionTypes.PLAYER_MADE_UP_MIND, payload: { player: player2, hand: HAND_TYPE.SCISSOR } },
            );

            expect(gameStateWithPlayer2Choice).toMatchObject({ matchState: MATCH_STATE.PLAYER2_WON });
            expect(gameStateWithPlayer2Choice).toMatchObject({ player2Wins: player2Wins + 1 });
        });

        test('should label the match as a draw if both players choose the same hand and keep wins same as before', () => {
            const initialState = reducer(undefined, initAction);

            const playingGameState: PlayingGameState = reducer(initialState, { type: actionTypes.WATCH_GAME_MODE_SELECTED });
            const { player1, player2, player1Wins, player2Wins } = playingGameState;

            const gameStateWithPlayer1Choice = reducer(
                playingGameState,
                { type: actionTypes.PLAYER_MADE_UP_MIND, payload: { player: player1, hand: HAND_TYPE.ROCK } },
            );

            const gameStateWithPlayer2Choice = reducer(
                gameStateWithPlayer1Choice,
                { type: actionTypes.PLAYER_MADE_UP_MIND, payload: { player: player2, hand: HAND_TYPE.ROCK } },
            );

            expect(gameStateWithPlayer2Choice).toMatchObject({ matchState: MATCH_STATE.DRAW });
            expect(gameStateWithPlayer2Choice).toMatchObject({ player1Wins: player1Wins });
            expect(gameStateWithPlayer2Choice).toMatchObject({ player2Wins: player2Wins });
        });
    });
})