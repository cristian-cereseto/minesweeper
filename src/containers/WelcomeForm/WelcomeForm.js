import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { resetBoard } from '../../redux/actions/BoardActions';
import './WelcomeForm.scss';
class WelcomeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            width: 0,
            minesAmount: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleStartClick = this.handleStartClick.bind(this);
    }

    render() {
        return (
            <Fragment>
                <div className="welcome-form">
                    <label htmlFor="width">Width</label>
                    <input type="number" id="width" onChange={event => (this.handleChange(event, 'width'))}/>
                    <label htmlFor="height">Height</label>
                    <input type="number" id="height" onChange={event => (this.handleChange(event, 'height'))}/>
                    <label htmlFor="minesAmount">Mines Amount</label>
                    <input type="number" id="minesAmount" onChange={event => (this.handleChange(event, 'minesAmount'))}/>
                </div>
                <button className="welcome-form__button"
                        disabled={this.isDisabled()}
                        onClick={this.handleStartClick}
                >
                    Start
                </button>
            </Fragment>
        )
    }

    handleChange(event, input) {
        const value = event.target.value || 0;
        this.setState(state => ({
            ...state,
            [input]: value
        }))
    }

    handleStartClick() {
        const { height, width, minesAmount } = this.state;
        this.props.resetBoard({
            height,
            width,
            minesAmount
        });
        this.props.history.push('/board');
    }

    isDisabled() {
        const { height, width, minesAmount } = this.state;

        return !(height && width && minesAmount);
    }
}

export default withRouter(connect(null, { resetBoard })(WelcomeForm))

