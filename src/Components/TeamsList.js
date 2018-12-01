import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
import TableCell from './MyTableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import {lighten} from '@material-ui/core/styles/colorManipulator';
import {connect} from "react-redux";
import {loadAllTeams, loadTournamentsList} from "../AC";
import Loader from "./Loader";

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
    // { id: 'temp1', numeric: true, disablePadding: false, label: 'temp1' },
    // { id: 'temp2', numeric: true, disablePadding: false, label: 'temp2' },
];

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount} = this.props;

        return (
            <TableHead>
                <TableRow>
                    {/*<TableCell padding="checkbox">*/}
                    {/*<Checkbox*/}
                    {/*indeterminate={numSelected > 0 && numSelected < rowCount}*/}
                    {/*checked={numSelected === rowCount}*/}
                    {/*onChange={onSelectAllClick}*/}
                    {/*/>*/}
                    {/*</TableCell>*/}
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

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    const {numSelected, classes} = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="h6" id="tableTitle">
                        Список команд
                    </Typography>
                )}
            </div>
            <div className={classes.spacer}/>
            {/*<div className={classes.actions}>*/}
            {/*{numSelected > 0 ? (*/}
            {/*<Tooltip title="Delete">*/}
            {/*<IconButton aria-label="Delete">*/}
            {/*<DeleteIcon/>*/}
            {/*</IconButton>*/}
            {/*</Tooltip>*/}
            {/*) : (*/}
            {/*<Tooltip title="Filter list">*/}
            {/*<IconButton aria-label="Filter list">*/}
            {/*<FilterListIcon/>*/}
            {/*</IconButton>*/}
            {/*</Tooltip>*/}
            {/*)}*/}
            {/*</div>*/}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        // minWidth: 400,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});


class TeamsList extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'players',
        selected: [],
        data: [
            // createData('Новгородские Медведи', 12, 4, 67, 4.3),
            // createData('Долгорукие', 10, 5.0, 51, 4.9),
            // createData('ФС', 11, 6, 24, 6.0),
            // createData('РеалФайв', 5, 4, 67, 4.3),
            // createData('Тени', 9, 5, 51, 4.9),
            // createData('ОксиДискО', 10, 2, 24, 6.0),
            // createData('ЮПитер', 14, 3, 67, 4.3),
            // createData('Космик Гелс', 8, 2, 51, 4.9),
            // createData('Ремпейдж', 10, 1, 24, 6.0),
        ],
        page: 0,
        rowsPerPage: 10,
    };

    componentDidMount() {
        const {tournamentsList, teamsState, loadTournamentsList, loadAllTeams, tournamentID} = this.props;

        if (tournamentsList.shouldReload && !tournamentsList.isLoading) loadTournamentsList();
        if (teamsState.shouldReload && !teamsState.isLoading) loadAllTeams();

        // debugger

        // if (!tournamentsList.shouldReload && !teamsState.shouldReload) {
        //     const teams = tournamentsList.list.get(tournamentID).teamsList.map(id => teamsState.list.get(id));
        //     // debugger
        //     const data = teams.map(team => createData(team.name, team.players, team.games));
        //
        //
        //     this.setState({
        //         data: data
        //     });
        // }
    }

    componentDidUpdate(prevProps, prevState) {
        const {tournamentsList, teamsState, loadTournamentsList, loadAllTeams, tournamentID} = this.props;

        if (tournamentsList.shouldReload && !tournamentsList.isLoading) {
            loadTournamentsList();
        }

        if (teamsState.shouldReload && !teamsState.isLoading) {
            loadAllTeams();
        }

        // if (!tournamentsList.shouldReload && !teamsState.shouldReload) {
        //     const teams = tournamentsList.list.get(tournamentID).teamsList.map(id => teamsState.list.get(id));
        //     const data = teams.map(team => createData(team.name, team.players, team.games));
        //
        //
        //     this.setState({
        //         data: data
        //     });
        // }

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
        console.log('----- clicked ', id);
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

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const {classes, tournamentsList, teamsState, tournamentID} = this.props;
        const {order, orderBy, selected, rowsPerPage, page} = this.state;

        if (tournamentsList.shouldReload || teamsState.shouldReload ||
            tournamentsList.isLoading || teamsState.isLoading) return <Loader />;

        const teams = tournamentsList.list.get(tournamentID).teamsList.map(id => teamsState.list.get(id));
        const data = teams.map(team => createData(team.name, team.players, team.games));

        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length}/>
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
                                        >
                                            {/*<TableCell padding="checkbox">*/}
                                            {/*<Checkbox checked={isSelected} />*/}
                                            {/*</TableCell>*/}
                                            <TableCell component="th" scope="row" padding="default">
                                                {n.name}
                                            </TableCell>
                                            <TableCell numeric>{n.players}</TableCell>
                                            <TableCell numeric>{n.games}</TableCell>
                                            {/*<TableCell numeric>{n.temp1}</TableCell>*/}
                                            {/*<TableCell numeric>{n.temp2}</TableCell>*/}
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
            </Paper>
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

const mapStateToProps = (state, ownProps) => {
    const {id} = ownProps;

    return {
        // teamsList: state.tournamentsList.list[id].teamsList,
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
