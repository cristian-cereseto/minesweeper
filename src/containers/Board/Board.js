import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from '../../components/Row/Row';

import './Board.scss';
import {Link} from "react-router-dom";
import Modal from "../../components/Modal/Modal";

class Board extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            modal: false
        }
    }

    render() {
        return (
            <div className="board">
                <span className="board__header">
                    MINES REMAINING:
                    <span className="board__header-amount"> {this.props.minesAmount - this.props.minesUncovered}</span>
                </span>
                {this.renderRows()}
                <Link to="/">
                    <button className="board__button">NEW GAME</button>
                </Link>
                <button onClick={this.toggleModal}>OPEN MODAL</button>
                <Modal show={this.state.modal} onCloseClick={this.toggleModal}>
                    <span className="board__message">MODAL CONTENT</span>
                </Modal>
            </div>
        )
    }

    renderRows() {
        if (this.props.board && this.props.board.length) {
            return this.props.board.map((rowCells, index) => <Row key={index} cells={rowCells} />);
        }
        return null;
    }

    toggleModal() {
        this.setState(state => ({
            ...state,
            modal: !state.modal
        }))
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

