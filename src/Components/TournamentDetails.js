import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles/index";

class TournamentDetails extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        const {resetClickedID} = this.props;
        resetClickedID();
        // this.setState({open: false});
    };

    getValue() {
        let i = 0;
        return function(value, title) {
            i++;
            return value ? <span style={{display: 'block'}} key={`value-${i}`}>{title} - <b>{value}</b></span> : null;
        }
    }

    getListOfTournamentsFields(tournament) {
        if (!tournament) return;

        // console.log('-----', tournament);
        let output = [];
        const value = this.getValue();

        output.push(value(tournament.place, 'город'));
        output.push(value(tournament.country, 'страна'));
        output.push(value(tournament.covering, 'покрытие'));
        output.push(value(tournament.format, 'формат'));
        output.push(value(tournament.games, 'игр'));
        output.push(value(tournament.teams, 'команд'));
        output.push(value(tournament.divisions, 'дивизионы'));

        return output;
    }

    render() {
        const {id, tournamentsList, classes} = this.props;

        return (
                <Dialog
                    open={!!id}
                    onClose={this.handleClose}

                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{tournamentsList.list.get(id).name}</DialogTitle>
                    <DialogContent className={classes.page}>
                        <DialogContentText id="alert-dialog-description">
                            {this.getListOfTournamentsFields(tournamentsList.list.get(id))}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Закрыть
                        </Button>
                    </DialogActions>
                </Dialog>
        );
    }
}

TournamentDetails.propTypes = {
    id: PropTypes.string.isRequired,
    resetClickedID: PropTypes.func.isRequired,
        // from store
    tournamentsList: PropTypes.object,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (store) => {
    return {
        tournamentsList: store.tournamentsList
    };
};

const mapDispatchToProps = () => {
    return {};
};

const styles = theme => ({
    page: {
        minWidth: 240
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TournamentDetails));
// export default TournamentDetails;