import { RESET_BOARD, OPEN_CELL, TOGGLE_CELL_FLAG } from '../actions/BoardActionTypes';
import { cloneDeep as _cloneDeep } from 'lodash';

const defaultCell = {
    hasMine: false,
    hasFlag: false,
    isOpen: false,
    count: 0,
    x: 0,
    y: 0
};

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
            let row;

            for (let i = 0; i <= height; i++) {
                row = getRowCells(width);
                board.push(row);
            }
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
};

const getRowCells = (width) => {
    const rowCells = [];
    let cell;
    for (let index = 0; index <= width; index ++) {
        cell = _cloneDeep(defaultCell);
        cell.y = index;

        rowCells.push(cell);
    }

    return rowCells;
}

export default minesweeperReducer;
