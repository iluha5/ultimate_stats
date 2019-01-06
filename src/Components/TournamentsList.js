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
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import TournamentDetails from "./TournamentDetails";
import Loader from "./Loader";

const styles = theme => ({
    root: {
        width: '100%',
        marginBottom: 50,
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
        paddingLeft: 0,
        marginTop: 64
    },
    link: {
        textDecoration: 'none'
    },
    fab: {
        position: 'fixed',
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
    },
    title: {

    }
});

class TournamentsList extends React.Component {
    state = {
        isCollapseOpen: [],
        isOpenAddTournament: false,
        clickedID: null,
    };

    componentDidMount() {
        const {loadTournamentsList} = this.props;
        loadTournamentsList();
    }

    componentDidUpdate(){
        const {shouldReload, loadTournamentsList} = this.props;

        if (shouldReload) {
            loadTournamentsList();
        }
    }

    setClickedID = (id, evt) => {
        evt.preventDefault();
        this.setState({
            clickedID: id
        })
    };

    renderTournamentsList() {
        const {tournamentsList, classes} = this.props;
        const list = mapToArr(tournamentsList.list);

        return list.map((tournament, i) => {
            return (
                <Link to={`/network/keeper/tournament/${tournament.id}`} className={classes.link} key={tournament.id}>
                    <ListItem button>
                        <ListItemText primary={tournament.name}/>
                        <ListItemText className={classes.dates}>
                            <span className={classes.dateNowrap}>{tournament.dateStart} -</span>
                             <span> </span>
                            <span className={classes.dateNowrap}>{tournament.dateEnd}</span>
                        </ListItemText>
                        <ListItemText secondary={tournament.place}/>
                        <ListItemSecondaryAction>
                            <IconButton
                                aria-label="Details"
                                onClick={(evt) => this.setClickedID(tournament.id, evt)}
                            >
                                <MoreVert />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Link>
            )
        })

    }

    handleOpenAddTournament = () => {
        this.setState({
            isOpenAddTournament: true
        })
    };

    // handleCloseAddTournament = (evt) =>{
    //     this.setState({
    //         isOpenAddTournament: false
    //     })
    //
    // };

    resetClickedID = () => {
      this.setState({
          clickedID: null
      });
    };


    render() {
        const {classes, shouldReload, tournamentsList} = this.props;
        const {clickedID} = this.state;

        return (
            <div className={classes.root}>
                <List
                    className={classes.mainList}
                    component="nav"
                    subheader={<ListSubheader component="div">Список турниров</ListSubheader>}
                >
                    {(shouldReload || tournamentsList.isLoading) ? <Loader />  : this.renderTournamentsList()}
                </List>

                {(shouldReload || tournamentsList.isLoading) ?
                    null
                    :
                    <Button variant="fab" className={classes.fab} color='secondary'
                            onClick={this.handleOpenAddTournament}>
                        <AddIcon/>
                    </Button>
                }

                {clickedID ? <TournamentDetails id={clickedID} resetClickedID={this.resetClickedID} /> : null }
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
    return {
        tournamentsList: state.tournamentsList,
        shouldReload: state.tournamentsList.shouldReload,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTournamentsList: () => dispatch(loadTournamentsList())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TournamentsList));
