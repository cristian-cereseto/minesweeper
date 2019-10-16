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
