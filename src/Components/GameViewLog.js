import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {loadDataForShowGame, loadPlayers, loadRosters, loadViewLog} from "../AC";
import Loader from "./Loader";
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from './MyTableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {getColorForLogLine, getLogLineToRenderView} from "../helpers";
import Error from "./Error";
import {makeGetLogProps} from "../Selectors";
import {TEAM_ONE, TEAM_TWO} from "../constants";

let counter = 0;

function createData(logLine, players, rosterTeamOne, rosterTeamTwo, teamNames) {
    counter += 1;
    const data = getLogLineToRenderView(logLine, players, rosterTeamOne, rosterTeamTwo, teamNames);

    return {
        id: counter,
        type: logLine.type,
        ...data
    };
}

const styles = theme => ({
    root: {
        width: '100%',
    },
    table: {
        // minWidth: 400,
    },
    tableWrapper: {
        overflowX: 'auto',
        minWidth: 360,
        maxWidth: 600,
        paddingBottom: 20,
    },
    hover: {
        cursor: 'pointer',
        height: 'auto'
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    time: {
        width: '8%',
        minWidth: 40,
    },
    score: {
        width: '10%',
        minWidth: 40,
    },
    details: {
        width: '35%',
        lineHeight: 1,
    },
});


class GameViewLog extends Component {

    async loadAllData() {
        const {loadViewLog, loadRosters, loadPlayers, loadDataForShowGame, logID, gameID} = this.props;

        await loadDataForShowGame(gameID);

        loadViewLog(logID);
        loadPlayers();
        loadRosters();

    }

    componentDidMount() {
        const {loadViewLog, loadRosters, loadPlayers, logID, isGlobalShow} = this.props;

        if (isGlobalShow) {
            this.loadAllData()
        } else {
            loadViewLog(logID);
            loadPlayers();
            loadRosters();
        }

    }

    componentDidUpdate() {
        const {loadViewLog, log, logID} = this.props;

        if (!log || (log.shouldReload && !log.isLoading)) {
            loadViewLog(logID);
        }
    }

    render() {
        const {log, classes, players, rosterTeamOne, rosterTeamTwo, teamNames} = this.props;

        if (!log || log.isLoading || log.shouldReload) return <Loader/>;

        if (log && log.isError) return <Error/>;

        const data = log.logList.map(line => createData(line, players, rosterTeamOne, rosterTeamTwo, teamNames));

        return (
            <div>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <TableHead>
                            <TableRow style={{height: 30, lineHeight: 1}}>
                                <TableCell>Время</TableCell>
                                <TableCell>Счет</TableCell>
                                <TableCell>{teamNames[TEAM_ONE]}</TableCell>
                                <TableCell>{teamNames[TEAM_TWO]}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.map(n => {
                                    if (!n.team_one && !n.team_two) return null;

                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={n.id}
                                            className={classes.hover}
                                            style={getColorForLogLine(n.type)}
                                        >
                                            <TableCell numeric component="th" scope="row" padding="default"
                                                       className={classes.time} style={{padding: '0px 4px 0px 0px'}}>
                                                {`${Math.floor(n.time / 60)}:${n.time % 60}`}
                                            </TableCell>
                                            <TableCell className={classes.score} style={{
                                                padding: '0px 4px 0px 6px',
                                                textAlign: 'center'
                                            }}>
                                                {n.score}
                                            </TableCell>
                                            <TableCell className={classes.details}
                                                       style={{padding: '0px 4px 0px 0px'}}>
                                                {n.team_one}
                                            </TableCell>
                                            <TableCell className={classes.details}
                                                       style={{padding: '0px 4px 0px 0px'}}>
                                                {n.team_two}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </div>

            </div>
        );
    }
}

GameViewLog.propTypes = {
    gameID: PropTypes.string.isRequired,
    logID: PropTypes.string.isRequired,
    preview: PropTypes.bool,
    teamOneID: PropTypes.string.isRequired,
    teamTwoID: PropTypes.string.isRequired,
    isGlobalShow: PropTypes.bool,
    //from store
    log: PropTypes.object,
    teams: PropTypes.object.isRequired,
    rosters: PropTypes.object.isRequired,
    players: PropTypes.object.isRequired,
    rosterTeamOne: PropTypes.object.isRequired,
    rosterTeamTwo: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const {isGlobalShow} = ownProps;

    if (!isGlobalShow) {
        const getLogProps = makeGetLogProps();

        return (state, ownProps) => {
            return getLogProps(state, ownProps);
        }
    } else {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadViewLog: (logID) => dispatch(loadViewLog(logID)),
        loadRosters: () => dispatch(loadRosters()),
        loadPlayers: () => dispatch(loadPlayers()),
        loadDataForShowGame: () => dispatch(loadDataForShowGame()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GameViewLog));

