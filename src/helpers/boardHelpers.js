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
        const x = Math.floor(Math.random() * width) || 0;
        const y = Math.floor(Math.random() * height) || 0;
        const coordinate = { x, y };
        if (!locations.includes(coordinate)) {
            locations.push(coordinate);
        }
    }
    return locations;
};

export const mineLocationsFor = (width, height, mines) => randomLocations({ width, height, mines });

export const getRowCells = (rowIndex, height, width, mines) => {
    const rowCells = [];
    let cell;
    for (let index = 0; index < width; index ++) {
        cell = _cloneDeep(defaultCell);
        cell.x = rowIndex;
        cell.y = index;
        cell.count = 0;

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

const getNearbyCount = (mines, x, y, height, width) => {
    const adjacentCoordsLimits = {
        minX: x - 1,
        maxX: x + 1,
        minY:  y - 1,
        maxY: y + 1,
    };
    let count = 0;
    let mX;
    let mY;
    const adjacentCoords = [];
    for (let xIndex = adjacentCoordsLimits.minX; xIndex <= adjacentCoordsLimits.maxX; xIndex ++) {
        for (let yIndex = adjacentCoordsLimits.minY; yIndex <= adjacentCoordsLimits.maxY; yIndex ++) {
            adjacentCoords.push({x: xIndex, y: yIndex});
        }
    }

    mines.forEach(mineCoords => {
        mX = mineCoords.x;
        mY = mineCoords.y;

        if (mX === x && mY === y) {
            return;
        }

        console.log('foreach', adjacentCoords, width, height, adjacentCoords.find(coords => {
            return (
                !(coords.x > width || coords.y > height) &&
                !(coords.x !== -1 || coords.y !== -1) &&
                coords.x === mineCoords.x && coords.y === mineCoords.y
            )}));

        if (adjacentCoords.find(coords => {
            return (
                !(coords.x > width || coords.y > height) &&
                !(coords.x !== -1 || coords.y !== -1) &&
                (coords.x === mineCoords.x || coords.y === mineCoords.y)
            );
        })) {
            count += 1;
        }
    });

    return count;
}
