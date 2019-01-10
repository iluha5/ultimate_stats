import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Timer from 'react-compound-timer';
import {connect} from "react-redux";
import {updateGameTimer} from "../AC";


class GameTimer extends Component {

    saveTimerToStore = (time) => {
        const {updateGameTimer, gameID} = this.props;

        updateGameTimer(gameID, Math.floor(time / 1000));
    };

    render() {
        const {initialTime, isTimerOn} = this.props;
// debugger
        return (
            <Timer
                initialTime={initialTime ? (+initialTime * 1000) : 0}
                startImmediately={false}
                lastUnit="m"
            >
                {(timer) => {
                    return (
                        <span>
                            {/* костыль из-за бага в Timer! Выводим initialTime вместо timer только сразу после загрузки данных с сервера */}
                            {Math.abs(initialTime - Math.floor(timer.getTime() / 1000)) > 1 ?
                                !timer.setTime(initialTime * 1000) &&
                                `${Math.floor(initialTime / 60)} : ${initialTime % 60}`
                                :
                                (<span><Timer.Minutes/> : <Timer.Seconds/></span>)
                            }
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
