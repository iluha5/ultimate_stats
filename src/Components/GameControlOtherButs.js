import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core/styles/index";
import PropTypes from 'prop-types';

const styles = theme => ({
    but: {
        padding: 1,
        minHeight: 20,
        minWidth: 35,
        marginTop: 3,
    },

});

class GameControlOtherButs extends Component {

    render() {
        const {classes, handleOtherBut, teamID} = this.props;

        return (
            <div>
                <Button variant="outlined" className={classes.but} onClick={handleOtherBut(teamID)}>
                    TO
                </Button>
                <Button variant="outlined" className={classes.but} onClick={handleOtherBut(teamID)}>
                    SotG
                </Button>
                <Button variant="outlined" className={classes.but} onClick={handleOtherBut(teamID)}>
                    Inj
                </Button>
                <Button variant="outlined" className={classes.but} onClick={handleOtherBut(teamID)}>
                    Др.
                </Button>
            </div>
        );
    }
}

GameControlOtherButs.propTypes = {
    classes: PropTypes.object,
    handleOtherBut: PropTypes.func.isRequired,
    teamID: PropTypes.string.isRequired,
};

export default withStyles(styles)(GameControlOtherButs);
