import React, { Component } from 'react';
import classname from 'classname';

import './Modal.scss';

export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
    }

    render() {
        return (
            <div className={this.getClassName()}>
                <div className="modal__content">
                    <button className="modal__close" onClick={this.handleCloseButtonClick}>X</button>
                    {this.props.children}
                </div>
            </div>
        )
    }

    getClassName() {
        return classname({
            modal: true,
            'modal--opened': this.props.show
        });
    }

    handleCloseButtonClick() {
        if (this.props.onCloseClick) {
            this.props.onCloseClick();
        }
    }
}

