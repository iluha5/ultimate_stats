import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from './MyTableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles/index";
import {loadPlayers, loadRosters} from "../AC";
import Loader from "./Loader";

const styles = theme => ({
    root: {
        width: '100%',
        height: 'auto',
        // marginTop: theme.spacing.unit * 3,
    },
    table: {
        overflowX: 'auto',
        // padding: 0,
        // minWidth: 400,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    row: {
        cursor: 'pointer',
        height: 30,
        lineHeight: 1,
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    thCell: {
      padding:0,
    },
});


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

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

// let counter = 0;

function createData(name, num, id) {
    // counter += 1;
    return {id, name, num};
}


const rows = [
    {id: 'num', numeric: true, disablePadding: false, label: '#'},
    {id: 'name', numeric: false, disablePadding: false, label: 'Фамилия И.'},
];

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {order, orderBy} = this.props;

        return (
            <TableHead >
                <TableRow style={{height: 25, backgroundColor: '#f4f3f0'}}>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                                style={{padding: '0px 4px 0px 4px'}}
                                // className={classes.thCell}
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
    // numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};


class GameControlRoster extends Component {
    state = {
        order: 'asc',
        orderBy: 'num',
        selected: [],
        data: [],

    };

    componentDidMount() {
        const {loadRosters, loadPlayers} = this.props;
        loadRosters();
        loadPlayers();

    }

    componentDidUpdate() {
        const {rosters, players, loadRosters, loadPlayers} = this.props;

        if (rosters.shouldReload) {
            loadRosters();
        }

        if (players.shouldReload) {
            loadPlayers();
        }

        // this.setState({
        //     data: rosters.list.get(rosterID).players
        //     .map(player => createData(players.list.get(player.id).name, player.num))
        // })
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

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    // handleClick = (event, id) => {
    //     console.log('----- clicked Player', id);
    // };


    render() {
        const {order, orderBy} = this.state;
        const {classes, rosters, players, rosterID, handlePlayerClick} = this.props;

        if (rosters.isLoading || rosters.shouldReload ||
            players.isLoading || players.shouldReload) return <Loader/>;

        const data = rosters.list.get(rosterID).players
            .map(player => createData(
                `${players.list.get(player.id).secondName} ${players.list.get(player.id).firstName[0]}.`,
                player.num,
                player.id
            ));

        // debugger

        return (
            <div className={classes.tableWrapper}>
                <Table className={classes.table} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={this.handleSelectAllClick}
                        onRequestSort={this.handleRequestSort}
                        rowCount={data.length}
                    />
                    <TableBody>
                        {stableSort(data, getSorting(order, orderBy))
                            .map(n => {
                                const isSelected = this.isSelected(n.id);
                                return (
                                    <TableRow
                                        hover
                                        onClick={handlePlayerClick && handlePlayerClick(n.id, `#${n.num} ${n.name}`)}
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        tabIndex={-1}
                                        key={n.id}
                                        selected={isSelected}
                                        className={classes.row}
                                    >
                                        <TableCell
                                            numeric
                                            component="th"
                                            scope="row"
                                            padding="default"
                                            style={{padding: '0px 4px 0px 0px'}}
                                        >
                                            {n.num}
                                        </TableCell>
                                        <TableCell style={{padding: '0px 0px 0px 4px'}}>{n.name}</TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

GameControlRoster.propTypes = {
    rosterID: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    //from store
    rosters: PropTypes.object.isRequired,
    players: PropTypes.object.isRequired,
    loadRosters: PropTypes.func.isRequired,
    loadPlayers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        rosters: state.rosters,
        players: state.players
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadRosters: () => dispatch(loadRosters()),
        loadPlayers: () => dispatch(loadPlayers()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GameControlRoster));
