import reducer from './BoardReducer';

describe('reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({    height: 0,
            width: 0,
            minesAmount: 0,
            minesUncovered: 0,
            cellsOpened: 0,
            board: {
                rows: []
            },
            gameOver: false,
            winGame: false,})
    });
});
