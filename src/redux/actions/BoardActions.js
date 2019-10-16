import { RESET_BOARD, OPEN_CELL, TOGGLE_CELL_FLAG } from '../actions/BoardActionTypes';

export const resetBoard = boardFeatures => ({
    type: RESET_BOARD,
    payload: {
        width: boardFeatures.width,
        height: boardFeatures.height,
        minesAmount: boardFeatures.minesAmount,
    }
});

export const openCell = coordinates => ({
    type: OPEN_CELL,
    payload: {
        x: coordinates.x,
        y: coordinates.y,
    }
});

export const flagCell = coordinates => ({
    type: TOGGLE_CELL_FLAG,
    payload: {
        x: coordinates.x,
        y: coordinates.y,
    }
});
