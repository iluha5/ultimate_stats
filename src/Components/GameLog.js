import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {loadLog} from "../AC";
import Loader from "./Loader";

class GameLog extends Component {

    componentDidMount() {
        const {loadLog, log, game} = this.props;
        // debugger
        if (!log || (log.shouldReload && !log.isLoading)) {
            loadLog(game.logID);
        }
    }

    componentDidUpdate() {
        const {loadLog, log, game} = this.props;
        if (!log || (log.shouldReload && !log.isLoading)) {
            loadLog(game.logID);
        }
    }

    render() {
        const {log} = this.props;
// debugger

        if (!log || log.isLoading || log.shouldReload) return <Loader />;

        return (
            <div>
                {log === null ? 'нету' : log.id}
            </div>
        );
    }
}

GameLog.propTypes = {
    gameID: PropTypes.string.isRequired,
    //from store
    game: PropTypes.object.isRequired,
    log: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
    const {gameID} = ownProps;
    const logID = state.games.list.get(gameID).logID;
    const log = !state.logs.list.isEmpty() ?  state.logs.list.get(logID) : null;
// debugger

    return {
        game: state.games.list.get(gameID),
        log: log,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadLog: (logID) => dispatch(loadLog(logID))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameLog);

