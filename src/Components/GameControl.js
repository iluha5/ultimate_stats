import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core/styles/index";
import {DRAWER_WIDTH} from "../constants";
import GameControlRoster from "./GameControlRoster";
import Button from '@material-ui/core/Button';
import GameControlOtherButs from "./GameControlOtherButs";


const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 15,
        // textAlign: 'center',
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
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            overflowX: 'auto',
        }
    },
    scoreItem2: {
        // border: '1px solid #000',
        lineHeight: 1,
        width: '40%',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            overflowX: 'auto',
        }
    },

    rosterRoot: {
        display: 'flex',
        overflow: 'hidden',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            // height: 200, // ROSTER H
            width: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            // height: 300,
            width: 600,
        },
    },
    rosterRootIsOffence: {
        backgroundColor: '#fdd3d5',
    },
    rosterWrapper: {
        width: '50%',
        // backgroundColor: '#fdd3d5',
        '&:nth-child(2)': {
            borderLeft: '1px solid #000'
        }
        // overflowY: 'scroll',
        // paddingRight: 17,
        // boxSizing: 'content-box'
    },
    roster: {
        width: '100%',
        height: '100%',
        // paddingRight: 0,
        [theme.breakpoints.down('sm')]: {
            overflowY: 'scroll',
            paddingRight: 17,
            boxSizing: 'content-box',
        },
        [theme.breakpoints.up('sm')]: {
            overflowY: 'scroll',
            paddingRight: 0,
            // boxSizing: 'content-box',
        }

    },
    throwAndTurnLine: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        padding: '0px 15px'
    },
    throwAndTurnLineReverse: {
        flexDirection: 'row-reverse'
    },
    throw: {
        width: '40%',
        marginTop: 3,
        padding: 1,
        minHeight: 20
    },
    turnOver: {
        width: '40%',
        padding: 1,
        marginTop: 3,
        minHeight: 20
    },
    othersButs: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '0px 3px',
        width: '100%',
    },
});


class GameControl extends Component {
    state = {
        viewPortH: 0,
        isTeamOneOffence: true,
    };

    componentDidMount() {
        const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        this.setState({
            viewPortH: h
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        console.log('-----h', h - 200);

        if (prevState.viewPortH !== h) {
            this.setState({
                viewPortH: h
            })
        }
    }

    handleThrow = (e) => {
        e.preventDefault();
        const {isTeamOneOffence} = this.state;

        console.log('----- throw team one?', isTeamOneOffence);
    }

    handleTurn = (e) => {
        e.preventDefault();
        const {isTeamOneOffence} = this.state;

        this.setState({
            isTeamOneOffence: !isTeamOneOffence
        })
    };

    handleOtherBut = id => e =>{
        console.log(e.target.innerHTML);
        console.log(id);
    };

    render() {
        const {game, teamsNames, classes} = this.props;
        const {viewPortH, isTeamOneOffence} = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.scoreRoot}>
                    <Typography variant="overline" gutterBottom className={classes.scoreItem}>
                        [{game.codeOne}] {teamsNames[0]}
                    </Typography>

                    <Typography variant="h6" gutterBottom className={classes.score}>
                        <span
                            className={classes.code}>[{game.takenTimeOutsTeamOne.length}]</span>{`${game.teamOneScore} - ${game.teamTwoScore}`}<span
                        className={classes.code}>[{game.takenTimeOutsTeamTwo.length}]</span>
                    </Typography>

                    <Typography variant="overline" gutterBottom className={classes.scoreItem2}>
                        {teamsNames[1]} [{game.codeTwo}]
                    </Typography>
                </div>

                <div className={classes.rosterRoot} style={{height: viewPortH - 250}}>
                    <div className={[classes.rosterWrapper, isTeamOneOffence && classes.rosterRootIsOffence].join(' ')}>
                        <div className={classes.roster}>
                            <GameControlRoster rosterID={game.rosterID}/>
                        </div>
                    </div>
                    <div
                        className={[classes.rosterWrapper, !isTeamOneOffence && classes.rosterRootIsOffence].join(' ')}>
                        <div className={classes.roster}>
                            <GameControlRoster rosterID={game.rosterID}/>
                        </div>
                    </div>
                </div>

                <div
                    className={[classes.throwAndTurnLine, !isTeamOneOffence && classes.throwAndTurnLineReverse].join(' ')}>
                    <Button variant="outlined" color="secondary" className={classes.throw} onClick={this.handleThrow}>
                        Пас!
                    </Button>
                    <Button variant="outlined" color="primary" className={classes.turnOver} onClick={this.handleTurn}>
                        Турновер!
                    </Button>
                </div>

                <div className={classes.othersButs}>
                    <GameControlOtherButs handleOtherBut={this.handleOtherBut} teamID={game.teamOneID}/>
                    <GameControlOtherButs handleOtherBut={this.handleOtherBut} teamID={game.teamTwoID}/>
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
