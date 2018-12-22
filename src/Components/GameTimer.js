import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Timer from 'react-compound-timer';
import {connect} from "react-redux";
import {updateGameTimer} from "../AC";


class GameTimer extends Component {

    saveTimerToStore = (time) => {
        const {updateGameTimer, gameID, game, initialTime} = this.props;

        // if (game.shouldSetTimer) {
        //     updateGameTimer(gameID, game.timePassed);
        // } else {
        // console.log('-----initialTime', initialTime);
        // console.log('-----time', time);
        // debugger
            updateGameTimer(gameID, Math.floor(time / 1000));
        // }
    };

    render() {
        const {initialTime, isTimerOn} = this.props;
// debugger
        return (
            <Timer
                initialTime={initialTime ? (+initialTime * 1000) : 0}
                startImmediately={false}
            >
                {(timer) => {
                    console.log('-----initialTime - inside', initialTime);
                    // debugger;
                    return (
                        <span>
                            <Timer.Minutes/>
                            :
                            <Timer.Seconds/>
                            {Math.abs(initialTime - Math.floor(timer.getTime() / 1000)) > 1 ?  timer.setTime(initialTime * 1000) : null}
                            {this.saveTimerToStore(timer.getTime())}
                            {isTimerOn ? timer.start() : timer.stop()}
                        </span>
                    )
                }
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
