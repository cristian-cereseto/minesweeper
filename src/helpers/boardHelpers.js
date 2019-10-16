import { cloneDeep as _cloneDeep } from 'lodash';

const defaultCell = {
    hasMine: false,
    hasFlag: false,
    isOpen: false,
    count: 0,
    x: 0,
    y: 0
};

const randomLocations = ({ width, height, mines }) => {
    const locations = [];

    while (locations.length < mines) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        const coordinate = { x, y };
        if (!locations.includes(coordinate)) {
            locations.push(coordinate);
        }
    }
    return locations;
};

export const mineLocationsFor = (width, height, mines) => randomLocations({ width, height, mines });

export const getRowCells = (rowIndex, width) => {
    const rowCells = [];
    let cell;
    for (let index = 0; index < width; index ++) {
        cell = _cloneDeep(defaultCell);
        cell.x = rowIndex;
        cell.y = index;

        rowCells.push(cell);
    }

    return rowCells;
}

export const getAdjacentCells = (coordinates, height, width, board) => {
    const { x, y } = coordinates;
    const adjacentBoundaries = {
        minX: (x > 0) ? x - 1 : 0,
        maxX: (x < height - 1) ? x + 1 : height - 1,
        minY: (y > 0) ? y - 1 : 0,
        maxY: (y < width - 1) ? y + 1 : width - 1,
    };

    const adjacentCells = [];
    let rowToCheckForMines;
    let adjacentCell;
    for (let indexX = adjacentBoundaries.minX; indexX <= adjacentBoundaries.maxX; indexX ++) {
        rowToCheckForMines = board[indexX];
        for (let indexY = adjacentBoundaries.minY; indexY <= adjacentBoundaries.maxY; indexY ++) {
            adjacentCell = rowToCheckForMines[indexY];
            if (adjacentCell.x !== x || adjacentCell.y !== y) {
                adjacentCells.push(adjacentCell);
            }
        }
    }

    return adjacentCells;
}
