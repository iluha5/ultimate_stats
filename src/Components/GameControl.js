import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core/styles/index";
import {DRAWER_WIDTH} from "../constants";
import GameControlRoster from "./GameControlRoster";


const styles = theme => ({
    root: {
        paddingTop: 15,

    },
    code: {
        textAlign: 'center',
        padding: 0,
        margin: 0,
        fontSize: 12,
        color: '#66696b',
        fontWeight: 300,
    },
    timeoutLine: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },

    scoreRoot: {
        // border: '1px solid #f00',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    score: {
        // border: '1px solid #f00',
        minWidth: 90,
        textAlign: 'center',
        lineHeight: 1,
    },
    scoreItem: {
        // border: '1px solid #000',
        lineHeight: 1,
        width: '40%',
        textAlign: 'right',
        overflow: 'scroll',
    },
    scoreItem2: {
        // border: '1px solid #000',
        lineHeight: 1,
        width: '40%',
        overflow: 'scroll',
    },

    rosterRoot: {
        display: 'flex'
    }
});



class GameControl extends Component {


    render() {
        const {game, teamsNames, classes} = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.scoreRoot}>
                    <Typography variant="overline" gutterBottom className={classes.scoreItem}>
                        [{game.codeOne}] {teamsNames[0]}
                    </Typography>

                    <Typography variant="h6" gutterBottom className={classes.score}>
                        <span className={classes.code}>[{game.takenTimeOutsTeamOne.length}]</span>{`${game.teamOneScore} - ${game.teamTwoScore}`}<span className={classes.code}>[{game.takenTimeOutsTeamTwo.length}]</span>
                    </Typography>

                    <Typography variant="overline" gutterBottom className={classes.scoreItem2}>
                        {teamsNames[1]} [{game.codeTwo}]
                    </Typography>
                </div>
                <div className={classes.rosterRoot}>
                    <div>
                        <GameControlRoster rosterID={game.rosterID} />
                    </div>
                    <div></div>
                </div>
            </div>

        );
    }
}

GameControl.propTypes = {
    gameID: PropTypes.string.isRequired,
    //from store
    game: PropTypes.object.isRequired,
    teamsNames: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const {gameID} = ownProps;
    const gameData = state.games.list.get(gameID);
    const teamOneName = state.teams.list.get(gameData.teamOneID).name;
    const teamTwoName = state.teams.list.get(gameData.teamTwoID).name;

    return {
        game: gameData,
        teamsNames: [teamOneName, teamTwoName],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GameControl));
