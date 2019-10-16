import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openCell, flagCell } from '../../redux/actions/BoardActions';

import './Cell.scss';

class Cell extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <div className="cell" onClick={this.handleClick} onContextMenu={this.handleClick}>
                {this.renderContent()}
            </div>
        )
    }

    renderContent() {
        if (this.props.isOpen) {
            if (this.props.hasFlag) {
                return '🚩';
            } else if (this.props.hasMine) {
                return '💣';
            } else {
                return this.props.count;
            }
        } else {
            return null;
        }
    }

    handleClick(event) {
        if (event.type === 'click') {
            this.props.openCell({x: this.props.x, y: this.props.y});
        } else {
            event.preventDefault();
            this.props.flagCell({x: this.props.x, y: this.props.y});
        }
    }
}

export default connect(null, { openCell, flagCell })(Cell)


