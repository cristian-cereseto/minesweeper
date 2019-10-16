import React, { Component } from 'react';

import './Cell.scss';

export default class Cell extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="cell">
                {this.renderContent()}
            </div>
        )
    }

    renderContent() {
        if (this.props.hasMine) {
            return '💣';
        } else if (this.props.hasFlag) {
            return '🚩';
        } else {
            return null;
        }
    }
}

