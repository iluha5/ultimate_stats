import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles/index";
import AppDrawer from "./AppDrawer";
import {DRAWER_WIDTH} from "../constants";
import GameTimer from "./GameTimer";

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
            marginLeft: DRAWER_WIDTH,
        },
        paddingTop: 70,

    },
});

class Game extends Component {
    // saveTimerToStore = (currTime) => {
    //     console.log('-----currTime', currTime);
    //
    // };

    render() {
        const { classes, id, tournamentID, timePassed } = this.props;
        console.log('-----timePassed', timePassed);

        return (
            <div>
                <AppDrawer title={<GameTimer gameID={id} />} isGame />
                <main className={classes.content}>
                    Панель ведения игры.
                    gameID: {id},
                    tournamentID: {tournamentID}
                </main>

            </div>
        );
    }
}

Game.propTypes = {
    id: PropTypes.string.isRequired,
    tournamentID: PropTypes.string.isRequired,
    //from store
    user: PropTypes.object.isRequired,
    timePassed: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const {id} = ownProps;
    return {
        user: state.user.userData,
        timePassed: state.games.list.get(id).timePassed
    }
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Game));
