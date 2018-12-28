import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core/styles/index";
import PropTypes from 'prop-types';
import {INJURY, OTHER, SOTG, TIMEOUT} from "../constants";

const styles = theme => ({
    but: {
        padding: 1,
        minHeight: 30,
        minWidth: 35,
        marginTop: 3,
        marginLeft: 3,
    },

});

class GameControlOtherButs extends Component {

    render() {
        const {classes, handleClick, team} = this.props;

        return (
            <div>
                <Button variant="outlined" className={classes.but} onClick={handleClick(TIMEOUT + team)}>
                    TO
                </Button>
                <Button variant="outlined" className={classes.but} onClick={handleClick(SOTG + team)}>
                    SotG
                </Button>
                <Button variant="outlined" className={classes.but} onClick={handleClick(INJURY + team)}>
                    Inj
                </Button>
                <Button variant="outlined" className={classes.but} onClick={handleClick(OTHER + team)}>
                    Др.
                </Button>
            </div>
        );
    }
}

GameControlOtherButs.propTypes = {
    classes: PropTypes.object,
    handleClick: PropTypes.func.isRequired,
    team: PropTypes.string.isRequired,
};

export default withStyles(styles)(GameControlOtherButs);
