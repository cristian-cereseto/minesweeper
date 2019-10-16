import { RESET_BOARD, OPEN_CELL, TOGGLE_CELL_FLAG } from '../actions/BoardActionTypes';
import { getRowCells, mineLocationsFor } from '../../helpers/boardHelpers';

const initialState = {
    height: 0,
    width: 0,
    minesAmount: 0,
    minesUncovered: 0,
    board: {
        rows: []
    }
};

const minesweeperReducer = (state = initialState, action = { type: '' }) => {
    switch (action.type) {
        case RESET_BOARD: {
            const { width, height, minesAmount } = action.payload;
            let clonedState = {
                height,
                width,
                minesAmount,
                minesUncovered: 0,
                board: []
            };
            const board = [];
            const mines = mineLocationsFor(width, height, minesAmount);
            let row;
            let cell;

            for (let index = 0; index < height; index++) {
                row = getRowCells(index, width);
                board.push(row);
            }

            mines.forEach(coordinates => {
                const { x, y } = coordinates;
                row = board[y];

                cell = row[x];
                cell.hasMine = true;
            });

            clonedState.board = board;
            return clonedState;
        }
        case OPEN_CELL: {
            return state;
        }
        case TOGGLE_CELL_FLAG: {
            return state;
        }
        default:
            return state;
    }
}

export default minesweeperReducer;
