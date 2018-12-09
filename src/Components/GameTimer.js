import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Timer from 'react-compound-timer';
import {connect} from "react-redux";
import {updateGameTimer} from "../AC";


class GameTimer extends Component {

    saveTimerToStore = (time) => {
        const {updateGameTimer, gameID} = this.props;
        updateGameTimer(gameID, time);
    };

    render() {
        const {initialTime, isTimerOn} = this.props;

        return (
            <Timer
                initialTime={initialTime ? +initialTime : 0}
                startImmediately={false}
            >
                {(timer) => (
                    <span>
                            <Timer.Minutes/>
                            :
                            <Timer.Seconds/>
                        {this.saveTimerToStore(timer.getTime())}
                        {isTimerOn ? timer.start() : timer.stop()}
                        </span>
                )
                }
            </Timer>
        );
    }
}

GameTimer.propTypes = {
    // saveTimerToStore: PropTypes.func.isRequired,
    gameID: PropTypes.string.isRequired,
    initialTime: PropTypes.number,
    isTimerOn: PropTypes.bool,
    //from store
    updateGameTimer: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const {gameID} = ownProps;

    return {
        game: state.games.list.get(gameID)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateGameTimer: (gameID, time) => dispatch(updateGameTimer(gameID, time))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameTimer);
