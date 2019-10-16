import React, { Component } from 'react';
import { connect } from 'react-redux';

class Board extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="board">
                BOARD
            </div>
        )
    }
}

export default connect(null, null)(Board)

