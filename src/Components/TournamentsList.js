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
import AddTournament from "./AddTournament";

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
    },
    collapse: {
        color: 'rgba(0, 0, 0, 0.54)'
    },
    dates: {
      whiteSpace: 'normal'
    },
    dateNowrap: {
        fontSize: '0.875rem',
        color: 'gray',
        whiteSpace: 'nowrap'
    }
});

class TournamentsList extends React.Component {
    state = {
        isCollapseOpen: [],
        isOpenAddTournament: false,
    };

    componentDidMount() {
        const {loadTournamentsList} = this.props;
        loadTournamentsList();
    }

    componentDidUpdate(){
        const {shouldRealod, loadTournamentsList} = this.props;

        if (shouldRealod) {
            loadTournamentsList();
        }
    }

    handleCollapseClick = (i) => {
        return () => {
            let newCollapseArr = [...this.state.isCollapseOpen];
            // console.log('-----', newCollapseArr);
            newCollapseArr[i] = !newCollapseArr[i];

            this.setState({
                isCollapseOpen: newCollapseArr
            });
        }
    };

    getValue() {
        let i = 0;
        return function(value) {
            i++;
            return value ? <div key={`value-${i}`}>- {value}</div> : null;
        }
    }

    getListOfTournamentsFields(tournament) {
        if (!tournament) return;

        let output = [];
        const value = this.getValue();

        output.push(value(tournament.place));
        output.push(value(tournament.country));
        output.push(value(tournament.covering));
        output.push(value(tournament.format));
        output.push(value(tournament.games));
        output.push(value(tournament.teams));

        return output;
    }

    renderTournamentsList() {
        const {tournamentsList, classes} = this.props;
        const list = mapToArr(tournamentsList.list);

        return list.map((tournament, i) => {
            return (
                <Link to={`/network/keeper/${tournament.id}`} className={classes.link} key={tournament.id}>
                    {/*<ListItem button onClick={this.handleCollapseClick(i)}>*/}
                    <ListItem button>
                        <ListItemText primary={tournament.name}/>
                        <ListItemText className={classes.dates}>
                            <span className={classes.dateNowrap}>{tournament.dateStart} -</span>
                             <span> </span>
                            <span className={classes.dateNowrap}>{tournament.dateEnd}</span>
                        </ListItemText>
                        <ListItemText secondary={tournament.place}/>
                        {/*{this.state.isCollapseOpen[i] ? <ExpandLess/> : <ExpandMore/>}*/}
                    </ListItem>
                    {/*<Collapse in={this.state.isCollapseOpen[i]} timeout="auto" unmountOnExit*/}
                              {/*className={classes.collapse}>*/}
                        {/*<List component="div" disablePadding>*/}
                            {/*<ListItem button className={classes.nested}>*/}
                                {/*{this.getListOfTournamentsFields(tournament)}*/}
                            {/*</ListItem>*/}
                        {/*</List>*/}
                    {/*</Collapse>*/}
                </Link>
            )
        })

    }

    handleOpenAddTournament = (evt) => {
        this.setState({
            isOpenAddTournament: true
        })
    };

    handleCloseAddTournament = (evt) =>{
        this.setState({
            isOpenAddTournament: false
        })

    };

    render() {
        const {classes} = this.props;
        const {isOpenAddTournament} = this.state;

        return (
            <div className={classes.root}>
                <List
                    className={classes.mainList}
                    component="nav"
                    subheader={<ListSubheader component="div">Список турниров</ListSubheader>}
                >
                    {this.renderTournamentsList()}
                </List>
                <Button variant="fab" className={classes.fab} color='secondary' onClick={this.handleOpenAddTournament}>
                    <AddIcon/>
                </Button>
                <AddTournament isOpen={isOpenAddTournament} toggleClose={this.handleCloseAddTournament}/>
            </div>
        );
    }
}

TournamentsList.propTypes = {
    classes: PropTypes.object.isRequired,
    // from store
    tournamentsList: PropTypes.object.isRequired,
    shouldReload: PropTypes.bool
};
const mapStateToProps = (state) => {
    // debugger
    return {
        tournamentsList: state.tournamentsList,
        shouldRealod: state.tournamentsList.shouldReload,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTournamentsList: () => dispatch(loadTournamentsList())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TournamentsList));
