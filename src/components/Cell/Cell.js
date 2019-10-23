import React, { Component } from 'react';
import { connect } from 'react-redux';
import classname from 'classname';
import { openCell, flagCell } from '../../redux/actions/BoardActions';

import './Cell.scss';

export class Cell extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <div className={this.getClassName()}
                 onClick={this.handleClick}
                 onContextMenu={this.handleClick}
                 aria-label={`cell ${this.props.x} ${this.props.y}`}>
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
            } else if (!this.props.count) {
                return null;
            } else {
                return this.props.count;
            }
        } else {
            return null;
        }
    }

    handleClick(event) {
        if (!this.props.hasFlag) {
            if (event.type === 'click') {
                this.props.openCell({x: this.props.x, y: this.props.y});
            } else {
                event.preventDefault();
                this.props.flagCell({x: this.props.x, y: this.props.y});
            }
        }
    }

    getClassName(){
        return classname({
            cell: true,
            'cell--opened': this.props.isOpen,
            'cell--flagged': this.props.hasFlag
        })
    }
}

export default connect(null, { openCell, flagCell })(Cell)


