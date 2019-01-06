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
import {loadAllTeams, loadTournamentsList} from "../AC";
import Loader from "./Loader";
import AddTeam from "./AddTeam";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


let counter = 0;

function createData(name, players, games, temp1, temp2) {
    counter += 1;
    return {id: counter, name, players: players, games: games, temp1: temp1, temp2: temp2};
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
    {id: 'name', numeric: false, disablePadding: false, label: 'Название'},
    {id: 'players', numeric: true, disablePadding: false, label: 'Игроков'},
    {id: 'games', numeric: true, disablePadding: false, label: 'Игр'},
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
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
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
        cursor: 'pointer'
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
});


class TeamsList extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'players',
        selected: [],
        data: [],
        page: 0,
        rowsPerPage: 10,
        isOpenAddTeam: false,
    };

    componentDidMount() {
        const {tournamentsList, teamsState, loadTournamentsList, loadAllTeams} = this.props;

        if (tournamentsList.shouldReload && !tournamentsList.isLoading) loadTournamentsList();
        if (teamsState.shouldReload && !teamsState.isLoading) loadAllTeams();
    }

    componentDidUpdate() {
        const {tournamentsList, teamsState, loadTournamentsList, loadAllTeams} = this.props;

        if (tournamentsList.shouldReload && !tournamentsList.isLoading) {
            loadTournamentsList();
        }

        if (teamsState.shouldReload && !teamsState.isLoading) {
            loadAllTeams();
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

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({selected: state.data.map(n => n.id)}));
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (event, id) => {
        // console.log('----- clicked ', id);
        // const { selected } = this.state;
        // const selectedIndex = selected.indexOf(id);
        // let newSelected = [];
        //
        // if (selectedIndex === -1) {
        //     newSelected = newSelected.concat(selected, id);
        // } else if (selectedIndex === 0) {
        //     newSelected = newSelected.concat(selected.slice(1));
        // } else if (selectedIndex === selected.length - 1) {
        //     newSelected = newSelected.concat(selected.slice(0, -1));
        // } else if (selectedIndex > 0) {
        //     newSelected = newSelected.concat(
        //         selected.slice(0, selectedIndex),
        //         selected.slice(selectedIndex + 1),
        //     );
        // }
        //
        // this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    handleCloseAddTeam = () =>{
        this.setState({
            isOpenAddTeam: false
        })
    };

    handleOpenAddTeam = () => {
        this.setState({
            isOpenAddTeam: true
        })
    };


    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const {classes, tournamentsList, teamsState, tournamentID} = this.props;
        const {order, orderBy, selected, rowsPerPage, page, isOpenAddTeam} = this.state;

        if (tournamentsList.shouldReload || teamsState.shouldReload ||
            tournamentsList.isLoading || teamsState.isLoading) return <Loader/>;

        const teams = tournamentsList.list.get(tournamentID).teamsList.map(id => {
            if (!teamsState.list.get(id)) return null;
            return teamsState.list.get(id)
        });
        const data = teams.filter(team => team).map(team => createData(team.name, team.players, team.games));

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
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n.id)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                            className={classes.hover}
                                        >
                                            <TableCell component="th" scope="row" padding="default">
                                                {n.name}
                                            </TableCell>
                                            <TableCell numeric>{n.players}</TableCell>
                                            <TableCell numeric>{n.games}</TableCell>
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
                <Button variant="fab" className={classes.fab} color='secondary'
                        onClick={this.handleOpenAddTeam}>
                    <AddIcon/>
                </Button>

                <AddTeam isOpen={isOpenAddTeam} toggleClose={this.handleCloseAddTeam} tournamentID={tournamentID}/>

            </div>
        );
    }
}

TeamsList.propTypes = {
    tournamentID: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    // from store
    tournamentsList: PropTypes.object.isRequired,
    teamsState: PropTypes.object.isRequired,
    loadAllTeams: PropTypes.func.isRequired,
    loadTournamentsList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        tournamentsList: state.tournamentsList,
        teamsState: state.teams,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadAllTeams: () => dispatch(loadAllTeams()),
        loadTournamentsList: () => dispatch(loadTournamentsList())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TeamsList));
