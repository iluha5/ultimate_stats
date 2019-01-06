import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from './MyTableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import {connect} from "react-redux";
import {goTo, loadAllTeams, loadGames, loadTournamentsList} from "../AC";
import Loader from "./Loader";
import {getMyGamesInProgress, mapToArr} from "../helpers";
import dateFormat from 'dateformat';
import {withRouter} from 'react-router-dom';

let counter = 0;

function createData(name, players, games, temp1, temp2) {
    counter += 1;
    return {id: counter, name, players: players, games: games, temp1: temp1, temp2: temp2};
}

function createGameData(teamOne, teamTwo, score, date, time, gameID) {
    counter += 1;
    return {
        id: counter,
        teamOne,
        teamTwo,
        score,
        date,
        time,
        gameID,
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

const rows = [
    {id: 'date', numeric: true, disablePadding: false, label: 'Дата'},
    {id: 'teamOne', numeric: true, disablePadding: false, label: 'Команда1'},
    {id: 'score', numeric: false, disablePadding: false, label: 'Счет'},
    {id: 'teamTwo', numeric: false, disablePadding: false, label: 'Команда2'},
    {id: 'time', numeric: false, disablePadding: false, label: 'Время'},
];

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {order, orderBy} = this.props;

        return (
            <TableHead>
                <TableRow>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                                style={
                                    row.id === 'teamOne' ? {textAlign: 'right'} : null ||
                                    row.id === 'score' ? {textAlign: 'center'} : null ||
                                    row.id === 'date' ? {textAlign: 'right'} : null
                                }

                            >
                                <Tooltip
                                    title="Sort"
                                    placement= {row.numeric ? 'bottom-end' : 'bottom-start'}
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
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const styles = () => ({
    root: {
        width: '100%',
        // marginTop: theme.spacing.unit * 3,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    hover: {
        cursor: 'pointer'
    }
});


class GamesList extends React.Component {
    state = {
        order: 'desc',
        orderBy: 'date',
        selected: [],
        data: [],
        page: 0,
        rowsPerPage: 10,
    };

    componentDidMount() {
        const {tournamentsList, teamsState, loadTournamentsList, loadAllTeams, gamesState, loadGames, user} = this.props;

        if (tournamentsList.shouldReload && !tournamentsList.isLoading) loadTournamentsList();
        if (teamsState.shouldReload && !teamsState.isLoading) loadAllTeams();

        if (gamesState.shouldReload && !gamesState.isLoading) loadGames(getMyGamesInProgress(gamesState.list, user.id));
    }

    componentDidUpdate() {
        const {tournamentsList, teamsState, loadTournamentsList, loadAllTeams, gamesState, loadGames, user} = this.props;

        if (tournamentsList.shouldReload && !tournamentsList.isLoading) {
            loadTournamentsList();
        }

        if (teamsState.shouldReload && !teamsState.isLoading) {
            loadAllTeams();
        }

        if (gamesState.shouldReload && !gamesState.isLoading) loadGames(getMyGamesInProgress(gamesState.list, user.id));
    }


    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({selected: state.data.map(n => n.id)}));
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (event, id) => {
        const {goTo, location} = this.props;

       goTo(`${location.pathname}/game/${id}`)
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const {classes, tournamentsList, teamsState, tournamentID, gamesState} = this.props;
        const {order, orderBy, selected, rowsPerPage, page} = this.state;

        if (tournamentsList.shouldReload || teamsState.shouldReload ||
            tournamentsList.isLoading || teamsState.isLoading){
            return <Loader/>;
        }

        if (gamesState.shouldReload || gamesState.isLoading) {
            return <Loader/>;
        }

        const teams = tournamentsList.list.get(tournamentID).teamsList.map(id => {
            if (!teamsState.list.get(id)) return null;
            return teamsState.list.get(id)
        });
        const data = teams.filter(team => team).map(team => createData(team.name, team.players, team.games));

        const games = mapToArr(gamesState.list).filter(game => game.tournamentID === tournamentID);
        const dataGames = games.map(game => {
            const teamOne = `${teamsState.list.get(game.teamOneID).name} [${game.codeOne}]`;
            const teamTwo = `[${game.codeTwo}] ${teamsState.list.get(game.teamTwoID).name}`;
            const score = `${game.teamOneScore} : ${game.teamTwoScore}`;
            const date = game.date;
            const time = `${Math.floor(+game.timePassed / 60)}:${Math.floor(+game.timePassed % 60)}`;
            const gameID = game.id;

            return createGameData(teamOne, teamTwo, score, date, time, gameID);
        });

        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <div className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={dataGames.length}
                        />
                        <TableBody>
                            {stableSort(dataGames, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n.gameID)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                            className={classes.hover}
                                        >
                                            <TableCell style={{textAlign: 'right'}}>{dateFormat(new Date(+n.date), 'dd-mm-yy mm:hh')}</TableCell>
                                            <TableCell component="th" scope="row" padding="default" style={{textAlign: 'right'}}>
                                                {n.teamOne}
                                            </TableCell>
                                            <TableCell style={{textAlign: 'center'}}>{n.score}</TableCell>
                                            <TableCell style={{textAlign: 'left'}}>{n.teamTwo}</TableCell>
                                            <TableCell style={{textAlign: 'left', fontWeight: 700}}>{n.time}</TableCell>
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
                    count={dataGames.length}
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

GamesList.propTypes = {
    tournamentID: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    // from store
    tournamentsList: PropTypes.object.isRequired,
    teamsState: PropTypes.object.isRequired,
    loadAllTeams: PropTypes.func.isRequired,
    loadTournamentsList: PropTypes.func.isRequired,
    loadGames: PropTypes.func.isRequired,
    gamesState: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user.userData,
        tournamentsList: state.tournamentsList,
        teamsState: state.teams,
        gamesState: state.games,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadAllTeams: () => dispatch(loadAllTeams()),
        loadTournamentsList: () => dispatch(loadTournamentsList()),
        loadGames: (noToLoadGamesList) => dispatch(loadGames(noToLoadGamesList)),
        goTo: (path) => dispatch(goTo(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(props => <GamesList {...props}/>)));
