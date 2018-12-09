import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from './MyTableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles/index";

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

let counter = 0;
function createData(name, num) {
    counter += 1;
    return {id: counter, name, num};
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
        const {onSelectAllClick, order, orderBy, numSelected, rowCount} = this.props;

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



class GameControlRoster extends Component {
    state = {
        order: 'asc',
        orderBy: 'players',
        selected: [],
        data: [],

    };

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

    handleClick = (event, id) => {
        console.log('----- clicked Player', id);
    };


    render() {
        const {order, orderBy, data} = this.state;
        const {classes} = this.props;

        return (
            <div className={classes.tableWrapper}>
                <Table className={classes.table} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        // numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={this.handleSelectAllClick}
                        onRequestSort={this.handleRequestSort}
                        rowCount={data.length}
                    />
                    <TableBody>
                        {stableSort(data, getSorting(order, orderBy))
                        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                        {/*{emptyRows > 0 && (*/}
                        {/*<TableRow style={{height: 49 * emptyRows}}>*/}
                        {/*<TableCell colSpan={6}/>*/}
                        {/*</TableRow>*/}
                        {/*)}*/}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

GameControlRoster.propTypes = {};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GameControlRoster));
