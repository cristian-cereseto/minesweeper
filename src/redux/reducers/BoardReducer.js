import { RESET_BOARD, OPEN_CELL, TOGGLE_CELL_FLAG } from '../actions/BoardActionTypes';
import {getAdjacentCells, getRowCells, mineLocationsFor} from '../../helpers/boardHelpers';
import { cloneDeep as _cloneDeep } from 'lodash';

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
                row = getRowCells(index, height, width, mines);
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
            const { x, y } = action.payload;
            const { height, width } = state;

            const clonedState = _cloneDeep(state);
            const board = clonedState.board;
            const cell = board[x][y];
            const adjacentCells = getAdjacentCells({ x, y }, height, width, board);
            const adjacentCellsWithMines = adjacentCells.filter(cell => cell.hasMine);
            cell.isOpen = true;
            cell.hasFlag = false;
            cell.count = adjacentCellsWithMines.length;

            if (!adjacentCellsWithMines.length) {
                adjacentCells.map(cell => {
                    cell.isOpen = true;
                });
            }

            return clonedState;
        }
        case TOGGLE_CELL_FLAG: {
            const { x, y } = action.payload;
            const clonedState = _cloneDeep(state);
            const board = clonedState.board;
            const cell = board[x][y];
            cell.hasFlag = true;
            cell.isOpen = true;
            clonedState.minesUncovered = state.minesUncovered + 1;

            return clonedState;
        }
        default:
            return state;
    }
}

export default minesweeperReducer;
