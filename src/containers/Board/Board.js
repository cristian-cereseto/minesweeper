import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Row from '../../components/Row/Row';

import './Board.scss';

class Board extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="board">
                {this.renderRows()}
            </div>
        )
    }

    renderRows() {
        if (this.props.board && this.props.board.length) {
            return this.props.board.map((rowCells, index) => <Row key={index} cells={rowCells} />);
        }
        return null;
    }
}

const mapStateToProps = (state) => {
    const { width, height, minesAmount, minesUncovered, board } = state.minesweeperReducer;
    return {
        width,
        height,
        minesAmount,
        minesUncovered,
        board
    }
};

export default connect(mapStateToProps, null)(Board)

