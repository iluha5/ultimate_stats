import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {loadLog} from "../AC";
import Loader from "./Loader";
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from './MyTableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import {getColorForLogLine, getLogLineToRender} from "../helpers";
import {TEAM_ONE, TEAM_TWO} from "../constants";

let counter = 0;

function createData(logLine, players, rosterTeamOne, rosterTeamTwo, teamNames) {
    counter += 1;
    // debugger
    const data = getLogLineToRender(logLine, players, rosterTeamOne, rosterTeamTwo, teamNames);

    return {
        id: counter,
        type: logLine.type,
        ...data
    };
}

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = (playingTeams) => [
    {id: 'time', numeric: true, disablePadding: false, label: 'Вр.'},
    {id: 'score', numeric: false, disablePadding: false, label: 'Сч.'},
    {id: 'details', numeric: false, disablePadding: false, label: `Описание (${playingTeams})`},
];


class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {order, orderBy, numSelected, rowCount, teamNames} = this.props;
        const playingTeams = `${teamNames[TEAM_ONE].substr(0, 5)}. - ${teamNames[TEAM_TWO].substr(0, 5)}.`

        return (
            <TableHead>
                <TableRow style={{height: 30, lineHeight: 1}}>
                    {rows(playingTeams).map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                                style={row.id === 'score' ? {
                                    padding: '0px 4px 0px 4px',
                                    textAlign: 'center'
                                } : {padding: '0px 4px 0px 4px'}}

                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    // onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    teamNames: PropTypes.object.isRequired,
};

const styles = theme => ({
    root: {
        width: '100%',
        // marginTop: theme.spacing.unit * 3,
    },
    table: {
        // minWidth: 400,
    },
    tableWrapper: {
        overflowX: 'auto',
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
        width: '12%'
    },
    score: {
        width: '14%'
    },
    details: {
        width: '74%',
        lineHeight: 1,
    },
});


class GameLog extends Component {
    state = {
        order: 'desc',
        orderBy: 'time',
        selected: [],
        data: [],
        page: 0,
        rowsPerPage: 25,
        // isOpenAddTeam: false,
    };


    componentDidMount() {
        const {loadLog, log, logID, preview} = this.props;
        // const {order} = this.state;
        // debugger
        if (!log || (log.shouldReload && !log.isLoading)) {
            // window.alert(game);
            loadLog(logID);
        }

        // if (preview && order === 'asc'){
        //     this.setState({
        //         order: 'desc'
        //     });
        // }
    }

    componentDidUpdate() {
        const {loadLog, log, game} = this.props;
        if (!log || (log.shouldReload && !log.isLoading)) {
            loadLog(game.logID);
        }
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
    };

    handleClick = (event, id) => {
        console.log('----- clicked ', id);
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;


    render() {
        const {log, classes, players, rosterTeamOne, rosterTeamTwo, teamNames, preview} = this.props;
        const {order, orderBy, selected, rowsPerPage, page} = this.state;

        if (!log || log.isLoading || log.shouldReload) return <Loader/>;
        // console.log('-----log', log);

        const data = log.logList.map(line => createData(line, players, rosterTeamOne, rosterTeamTwo, teamNames));
        // console.log('-----data', data);
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <div>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        {!preview && (
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data.length}
                                teamNames={teamNames}
                            />)
                        }
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    // debugger
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n.id)}
                                            // role="checkbox"
                                            // aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
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
                                            }}>{n.score}</TableCell>
                                            <TableCell className={classes.details}
                                                       style={{padding: '0px 4px 0px 0px'}}>{n.details}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 49 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    labelRowsPerPage={'Строк:'}
                    labelDisplayedRows={({from, to, count}) => `${from}-${to} из ${count}`}
                />

            </div>
        );
    }
}

GameLog.propTypes = {
    gameID: PropTypes.string.isRequired,
    logID: PropTypes.string.isRequired,
    preview: PropTypes.bool,
    //from store
    // game: PropTypes.object.isRequired,
    log: PropTypes.object,
    teams: PropTypes.object.isRequired,
    rosters: PropTypes.object.isRequired,
    players: PropTypes.object.isRequired,
    rosterTeamOne: PropTypes.object.isRequired,
    rosterTeamTwo: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const {gameID} = ownProps;
    const game = state.games.list.get(gameID);
    const teamNames = {
        [TEAM_ONE]: state.teams.list.get(game.teamOneID).name,
        [TEAM_TWO]: state.teams.list.get(game.teamTwoID).name,
    };
    const logID = state.games.list.get(gameID).logID;
    const log = !state.logs.list.isEmpty() ? state.logs.list.get(logID) : null;
    const rosterTeamOne = state.rosters.list.get(state.teams.list.get(game.teamOneID).rosterID);
    const rosterTeamTwo = state.rosters.list.get(state.teams.list.get(game.teamTwoID).rosterID);

    return {
        // game: game, //state.games.list.get(gameID),
        log: log,
        players: state.players.list,
        teams: state.teams.list,
        rosters: state.rosters.list,
        rosterTeamOne: rosterTeamOne,
        rosterTeamTwo: rosterTeamTwo,
        teamNames: teamNames,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadLog: (logID) => dispatch(loadLog(logID))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GameLog));

