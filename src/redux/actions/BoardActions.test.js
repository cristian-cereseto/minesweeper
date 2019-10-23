import * as actions from './BoardActions.js'
import * as types from './BoardActionTypes'

describe('actions', () => {
    it('should create an action to reset the board', () => {
        const payload = {
            width: 4,
            height: 4,
            minesAmount: 4
        };

        const expectedAction = {
            type: types.RESET_BOARD,
            payload
        };
        expect(actions.resetBoard(payload)).toEqual(expectedAction);
    });
    it('should create an action to open a cell', () => {
        const payload = {
            x: 0,
            y: 0
        };

        const expectedAction = {
            type: types.OPEN_CELL,
            payload
        };
        expect(actions.openCell(payload)).toEqual(expectedAction);
    });
    it('should create an action to flag a cell', () => {
        const payload = {
            x: 0,
            y: 0
        };

        const expectedAction = {
            type: types.TOGGLE_CELL_FLAG,
            payload
        };
        expect(actions.flagCell(payload)).toEqual(expectedAction);
    });
});
