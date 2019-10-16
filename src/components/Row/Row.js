import React, { Component } from 'react';
import Cell from '../Cell/Cell';

import './Row.scss';

export default class Row extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                {this.renderCells()}
            </div>
        )
    }

    renderCells() {
        if (this.props.cells && this.props.cells.length) {
            return this.props.cells.map((cell, index) => (<Cell {...cell} key={index} />));
        }
        return null;
    }
}

