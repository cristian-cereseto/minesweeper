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
            minesAmount: 0,
            selectedLevel: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectLevel = this.handleSelectLevel.bind(this);
        this.handleStartClick = this.handleStartClick.bind(this);
    }

    render() {
        return (
            <Fragment>
                <div className="welcome-form">
                    <div className="welcome-form__radio-buttons">
                        <span>Select Level:</span>
                        <label>
                            <input type="radio"
                                   value="easy"
                                   checked={this.state.selectedLevel === 'easy'}
                                   onChange={event => this.handleSelectLevel(event, 'easy')}
                            />
                            Easy
                        </label>
                        <label>
                            <input type="radio"
                                   value="medium"
                                   checked={this.state.selectedLevel === 'medium'}
                                   onChange={event => this.handleSelectLevel(event, 'medium')}
                            />
                            Medium
                        </label>
                        <label>
                            <input type="radio"
                                   value="hard"
                                   checked={this.state.selectedLevel === 'hard'}
                                   onChange={event => this.handleSelectLevel(event, 'hard')}
                            />
                            Hard
                        </label>
                    </div>
                    <label htmlFor="width">Width</label>
                    <input type="number"
                           id="width"
                           onChange={event => (this.handleChange(event, 'width'))}
                           value={this.state.width}
                    />
                    <label htmlFor="height">Height</label>
                    <input type="number"
                           id="height"
                           onChange={event => (this.handleChange(event, 'height'))}
                           value={this.state.height}
                    />
                    <label htmlFor="minesAmount">Mines Amount</label>
                    <input type="number"
                           id="minesAmount"
                           onChange={event => (this.handleChange(event, 'minesAmount'))}
                           value={this.state.minesAmount}
                    />
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

    handleSelectLevel(event, level) {
        const levelConfig = {
            easy: {
                height: 4,
                width: 4,
                minesAmount: 3,
            },
            medium: {
                height: 6,
                width: 6,
                minesAmount: 4,
            },
            hard: {
                height: 8,
                width: 8,
                minesAmount: 8,
            }
        };
        const defaultState = levelConfig[level];
        this.setState(() => ({...defaultState, selectedLevel: level}));
    }

    isDisabled() {
        const { height, width, minesAmount } = this.state;

        return !(height && width && minesAmount);
    }
}

export default withRouter(connect(null, { resetBoard })(WelcomeForm))

