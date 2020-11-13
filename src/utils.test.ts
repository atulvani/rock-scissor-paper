import { GAME_STATE, C3POAiPlayer, R2D2AiPlayer, MATCH_STATE, HAND_TYPE } from "./constants";
import { PlayingGameState } from './types';
import { getWinner, isBotPlayer, isWinningHand, swapIndexsOfArray } from "./utils";

describe('getWinner', () => {
    const player1 = C3POAiPlayer;
    const player2 = R2D2AiPlayer;
    let gameState: PlayingGameState;
    beforeEach(() => {
        gameState = {
            state: GAME_STATE.PLAYING,
            player1,
            player2,
            player1Wins: 0,
            player2Wins: 0,
            matchId: 1,
            matchState: MATCH_STATE.STILL_PLATING,
            player1Hand: null,
            player2Hand: null,
        };
    });

    test("when both players has equal wins", () => {
        expect(getWinner(gameState)).toBe(null);
    });
    test("when first player has more wins", () => {
        expect(getWinner({ ...gameState, player1Wins: gameState.player2Wins + 1 })).toBe(player1);
    });
    test("when second player has more wins", () => {
        expect(getWinner({ ...gameState, player2Wins: gameState.player1Wins + 1 })).toBe(player2);
    });
});

describe('isBotPlayer', () => {
    test("when the player is c3po", () => {
        expect(isBotPlayer(C3POAiPlayer)).toBe(true);
    });
    test("when the player is r2d2", () => {
        expect(isBotPlayer(R2D2AiPlayer)).toBe(true);
    });
    test("when the player is neither c3po nor r2d2", () => {
        expect(isBotPlayer((Math.random()).toString(32))).toBe(false);
    });
});

describe('isWinningHand', () => {
    test("when the first hand is rock and the second hand is rock", () => {
        expect(isWinningHand(HAND_TYPE.ROCK, HAND_TYPE.ROCK)).toBe(false);
    });
    test("when the first hand is rock and the second hand is scissor", () => {
        expect(isWinningHand(HAND_TYPE.ROCK, HAND_TYPE.SCISSOR)).toBe(true);
    });
    test("when the first hand is rock and the second hand is paper", () => {
        expect(isWinningHand(HAND_TYPE.ROCK, HAND_TYPE.PAPER)).toBe(false);
    });

    test("when the first hand is scissor and the second hand is rock", () => {
        expect(isWinningHand(HAND_TYPE.SCISSOR, HAND_TYPE.ROCK)).toBe(false);
    });
    test("when the first hand is scissor and the second hand is scissor", () => {
        expect(isWinningHand(HAND_TYPE.SCISSOR, HAND_TYPE.SCISSOR)).toBe(false);
    });
    test("when the first hand is scissor and the second hand is paper", () => {
        expect(isWinningHand(HAND_TYPE.SCISSOR, HAND_TYPE.PAPER)).toBe(true);
    });

    test("when the first hand is paper and the second hand is rock", () => {
        expect(isWinningHand(HAND_TYPE.PAPER, HAND_TYPE.ROCK)).toBe(true);
    });
    test("when the first hand is paper and the second hand is scissor", () => {
        expect(isWinningHand(HAND_TYPE.PAPER, HAND_TYPE.SCISSOR)).toBe(false);
    });
    test("when the first hand is paper and the second hand is paper", () => {
        expect(isWinningHand(HAND_TYPE.PAPER, HAND_TYPE.PAPER)).toBe(false);
    });
});

describe('swapIndexsOfArray', () => {
    test('when both items are present', () => {
        const itemAt3rdIndex = {};
        const itemAt5thIndex = {};
        const arr = [0, 1, 2, itemAt3rdIndex, 4, itemAt5thIndex, 6, 7, 8, 9];
        swapIndexsOfArray(arr, 3, 5);
        expect(arr[3]).toBe(itemAt5thIndex);
        expect(arr[5]).toBe(itemAt3rdIndex);
    });
    test("when one index is greather than array's length", () => {
        const itemAt3rdIndex = {};
        const arr = [0, 1, 2, itemAt3rdIndex];
        swapIndexsOfArray(arr, 3, 5);
        expect(arr[3]).toBe(undefined);
        expect(arr[4]).toBe(undefined); // the hole
        expect(arr[5]).toBe(itemAt3rdIndex);
    });
});
