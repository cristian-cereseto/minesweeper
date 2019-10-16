import { RESET_BOARD, OPEN_CELL, TOGGLE_CELL_FLAG } from '../actions/BoardActionTypes';

export const resetBoard = boardFeatures => ({
    type: RESET_BOARD,
    payload: {
        width: boardFeatures.width,
        height: boardFeatures.height,
        minesAmount: boardFeatures.minesAmount,
    }
})
