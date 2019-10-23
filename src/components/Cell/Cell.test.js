import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { Cell } from './Cell';

const defaultProps = {
    'hasMine': false,
    'hasFlag': false,
    'isOpen': false,
    'count': 0,
    'x': 0,
    'y': 0,
    openCell: jest.fn(),
    flagCell: jest.fn(),
};

beforeEach(cleanup);

describe('<Cell />', () => {
    test('renders without crashing', () => {
        const { container } = render(<Cell {...defaultProps} />);
        const cell = container.querySelector('.cell');
        expect(cell).toBeDefined();
    });

    test('shows number of mines nearby when opened', () => {
        const props = { ...defaultProps, count: 3, isOpen: true };
        const { getByText } = render(<Cell {...props} />);
        expect(getByText('3')).toBeDefined();
    });

    test('open cell when clicked', () => {
        const { container } = render(<Cell {...defaultProps} />);
        const cell = container.querySelector('.cell');
        fireEvent.click(cell);
        expect(defaultProps.openCell).toHaveBeenCalled();
    });

    test('flag cell when right clicked', () => {
        const { container } = render(<Cell {...defaultProps} />);
        const cell = container.querySelector('.cell');
        fireEvent.contextMenu(cell);
        expect(defaultProps.flagCell).toHaveBeenCalled();
    });
})
