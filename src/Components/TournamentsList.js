import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {connect} from "react-redux";
import {loadTournamentsList} from "../AC";
import {mapToArr} from "../helpers";
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        width: '100%',
        // maxWidth: 700,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    mainList: {
        paddingLeft: 0
    },
    link: {
        textDecoration: 'none'
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    }
});

class TournamentsList extends React.Component {
    state = {
        open: false,
    };

    componentDidMount() {
        const {loadTournamentsList} = this.props;
        loadTournamentsList();
    }

    handleClick = () => {
        this.setState(state => ({open: !state.open}));
    };

    getValue(value) {
        return value ? <div>{value}</div> : null;
    }

    getListOfTournamentsFields(tournament) {
        if (!tournament) return;

        let output = [];

        output.push(this.getValue(tournament.place));
        output.push(this.getValue(tournament.country));
        output.push(this.getValue(tournament.covering));
        output.push(this.getValue(tournament.format));
        output.push(this.getValue(tournament.games));
        output.push(this.getValue(tournament.teams));

        return output;
    }

    renderTournamentsList() {
        const {tournamentsList, classes} = this.props;
        const list = mapToArr(tournamentsList.list);

        return list.map(tournament => {
            return (
                <Link to={`/network/keeper/${tournament.id}`} className={classes.link} key={tournament.id}>
                    <ListItem button onClick={this.handleClick}>
                        <ListItemText primary={tournament.name}/>
                        <ListItemText secondary={tournament.dateStart + ' - ' + tournament.dateEnd}/>
                        <ListItemText secondary={tournament.place}/>
                        {this.state.open ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                {this.getListOfTournamentsFields(tournament)}
                            </ListItem>
                        </List>
                    </Collapse>
                </Link>
            )
        })

    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <List
                    className={classes.mainList}
                    component="nav"
                    subheader={<ListSubheader component="div">Список турниров</ListSubheader>}
                >
                    {this.renderTournamentsList()}
                </List>
                <Button variant="fab" className={classes.fab} color='secondary'>
                    <AddIcon/>
                </Button>
            </div>
        );
    }
}

TournamentsList.propTypes = {
    classes: PropTypes.object.isRequired,
    // from store
    tournamentsList: PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
    return {
        tournamentsList: state.tournamentsList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTournamentsList: () => dispatch(loadTournamentsList())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TournamentsList));
