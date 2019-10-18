import {RESET_BOARD, OPEN_CELL, TOGGLE_CELL_FLAG, GAME_OVER} from '../actions/BoardActionTypes';
import {getAdjacentCells, getRowCells, mineLocationsFor} from '../../helpers/boardHelpers';
import { cloneDeep as _cloneDeep } from 'lodash';

const initialState = {
    height: 0,
    width: 0,
    minesAmount: 0,
    minesUncovered: 0,
    cellsOpened: 0,
    board: {
        rows: []
    },
    gameOver: false,
    winGame: false,
};

const minesweeperReducer = (state = initialState, action = { type: '' }) => {
    switch (action.type) {
        case RESET_BOARD: {
            const { width, height, minesAmount } = action.payload;
            let clonedState = {
                ...initialState,
                height,
                width,
                minesAmount
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
            if (cell.hasMine) {
                cell.isOpen = true;
                clonedState.gameOver = true;
                clonedState.winGame = false;
                board.map(
                    row => {
                        row.map(cell => cell.isOpen = true);
                    }
                )
            } else {
                const adjacentCells = getAdjacentCells({ x, y }, height, width, board);
                const adjacentCellsWithMines = adjacentCells.filter(cell => cell.hasMine);
                cell.isOpen = true;
                cell.hasFlag = false;
                cell.count = adjacentCellsWithMines.length;
                clonedState.cellsOpened = clonedState.cellsOpened += 1;

                if (!adjacentCellsWithMines.length) {
                    adjacentCells.map(cell => {
                        cell.isOpen = true;
                        clonedState.cellsOpened = clonedState.cellsOpened += 1;
                    });
                }

                if (clonedState.cellsOpened === (clonedState.width * clonedState.height) - clonedState.minesAmount) {
                    clonedState.gameOver = true;
                    clonedState.winGame = true;
                }

            }

            return clonedState;
        }
        case TOGGLE_CELL_FLAG: {
            const { x, y } = action.payload;
            const clonedState = _cloneDeep(state);
            const board = clonedState.board;
            const cell = board[x][y];
            if (cell.hasFlag) {
                clonedState.minesUncovered = state.minesUncovered - 1;
            } else {
                clonedState.minesUncovered = state.minesUncovered + 1;
            }
            cell.hasFlag = !cell.hasFlag;
            cell.isOpen = !cell.isOpen;

            return clonedState;
        }
        case GAME_OVER: {
            const { winGame } = action.payload;
            const clonedState = _cloneDeep(state);
            clonedState.gameOver = true;
            clonedState.winGame = winGame;

            return clonedState;
        }
        default:
            return state;
    }
}

export default minesweeperReducer;
