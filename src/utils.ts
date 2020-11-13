import { C3POAiPlayer, R2D2AiPlayer, HAND_TYPE } from './constants';
import { HandType, PlayerType, PlayingGameState } from './types';

export const getWinner = (gameState: PlayingGameState) => {
    let winner;
    if (gameState.player1Wins > gameState.player2Wins) {
        winner = gameState.player1;
    } else if ( gameState.player1Wins < gameState.player2Wins) {
        winner = gameState.player2;
    } else { // player1Wins === player2Wins
        winner = null; // draw
    }
    return winner;
};

export const isBotPlayer = (player: PlayerType) => {
    return [C3POAiPlayer, R2D2AiPlayer].includes(player);
};

export const isWinningHand = (hand1: HandType, hand2: HandType) => {
    if (hand1 === HAND_TYPE.ROCK && hand2 === HAND_TYPE.SCISSOR) {
        return true;
    } else if (hand1 === HAND_TYPE.SCISSOR && hand2 === HAND_TYPE.PAPER) {
        return true;
    } else if (hand1 === HAND_TYPE.PAPER && hand2 === HAND_TYPE.ROCK) {
        return true;
    } else {
        return false;
    }
};

export const swapIndexsOfArray = (arr: any[], i: number, j: number) => {
    const ithItem = arr[i];
    arr[i] = arr[j];
    arr[j] = ithItem;
};
