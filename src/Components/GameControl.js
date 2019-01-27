import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core/styles/index";
import {
    CHANGE_OFFENSE,
    GOAL,
    PULL,
    REDO,
    TEAM_ONE,
    TEAM_TWO,
    THROW,
    TURNOVER,
    UNDO
} from "../constants";
import GameControlRoster from "./GameControlRoster";
import Button from '@material-ui/core/Button';
import GameControlOtherButs from "./GameControlOtherButs";
import GameLog from "./GameLog";
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import {gameControl} from "../AC";
// import Fab from '@material-ui/core/Fab';


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
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    score: {
        // border: '1px solid #f00',
        minWidth: 60,
        textAlign: 'center',
        lineHeight: 1,
    },
    scoreItem: {
        // border: '1px solid #000',
        lineHeight: 1,
        width: '45%',
        textAlign: 'right',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            overflowX: 'auto',
        },
        fontSize: '0.8rem',
    },
    scoreItem2: {
        // border: '1px solid #000',
        lineHeight: 1,
        width: '45%',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            overflowX: 'auto',
        },
        fontSize: '0.8rem',
    },

    rosterRoot: {
        display: 'flex',
        overflow: 'hidden',
        justifyContent: 'space-between',
        border: '1px solid #B7B7B7',
        borderRadius: 5,
        [theme.breakpoints.down('sm')]: {
            // height: 200, // ROSTER H
            width: '95%',
        },
        [theme.breakpoints.up('sm')]: {
            // height: 300,
            width: 600,
        },
    },
    rosterRootIsOffence: {
        backgroundColor: '#f7efcc',
    },
    rosterWrapper: {
        width: '50%',
        '&:nth-child(2)': {
            borderLeft: '1px solid #B7B7B7'
        }
    },
    roster: {
        position: 'relative',
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
        minHeight: 30
    },
    turnOver: {
        width: '40%',
        padding: 1,
        marginTop: 3,
        minHeight: 30
    },
    othersButs: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '0px 3px',
        width: '100%',
    },
    gameLogPrev: {
        position: 'relative',
        height: 65,
        width: '100%',
        // overflowY: 'hidden',
        border: '1px solid #B7B7B7',
        borderRadius: 5,
        overflowY: 'scroll',
        // paddingRight: 17,
        boxSizing: 'border-box',

    },
    undo: {
        position: 'absolute',
        bottom: 2,//theme.spacing.unit * 1,
        right: 8, //theme.spacing.unit * 1,
        minWidth: 20,
        minHeight: 20,
        width: 28,
        height: 28,
        padding: '1px 1px',
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    redo: {
        position: 'absolute',
        top: 2, //theme.spacing.unit * 1,
        right: 8, //theme.spacing.unit * 1,
        minWidth: 20,
        minHeight: 20,
        width: 28,
        height: 28,
        padding: '1px 1px',
        // backgroundColor: '#ffffff',
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    logWrapper: {
        position: 'relative',
        marginTop: 4,
        width: '95%',

    },
    inputLogLine: {
        height: 20,
        width: '90%',
        backgroundColor: '#f6f6f6',
        border: '1px solid #B7B7B7',
        margin: '4px 5px 0px 5px',
        textAlign: 'center',
        overflowY: 'scroll',
        borderRadius: 5,
    }
});


class GameControl extends Component {
    state = {
        viewPortH: 0,
        isTeamOneOffence: true,
        isPull: true,
        assist: null,
    };

    componentDidMount() {
        const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        this.setState({
            viewPortH: h
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        // console.log('-----h', h - 200);

        if (prevState.viewPortH !== h) {
            this.setState({
                viewPortH: h
            })
        }
    }

    // handleThrow = (e) => {
    //     e.preventDefault();
    //     const {isTeamOneOffence} = this.state;
    //
    //     console.log('----- throw team one?', isTeamOneOffence);
    // };
    //
    // handleTurn = (e) => {
    //     e.preventDefault();
    //     const {isTeamOneOffence} = this.state;
    //
    //     this.setState({
    //         isTeamOneOffence: !isTeamOneOffence
    //     })
    // };

    // handleOtherBut = id => e => {
    //     console.log(e.target.innerHTML);
    //     console.log(id);
    // };

    handlePlayerClick = (id, name) => e => {
        e.preventDefault();

        const {game, gameControl, log} = this.props;

        if (this.state.assist === null) {
            this.setState({
                assist: {id, name}
            });
            return 0;
        }

        const data = {
            assist: this.state.assist,
            goal: {id, name}
        };

        gameControl(GOAL, game, log, data);
        this.setState({
            assist: null
        });

    };

    handleClick = (type) => e => {
        e.preventDefault();
        const {game, gameControl, log} = this.props;

        gameControl(type, game, log);

        // type === UNDO && console.log('-----undoList', window.store.getState().undoList);
    };

    render() {
        const {game, teamsNames, classes, gameID, rosters, isUndoListEmpty, log} = this.props;
        const {viewPortH, assist} = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.scoreRoot}>
                    <Typography gutterBottom className={classes.scoreItem}>
                        <span style={{fontWeight: 700}}>{game.codeOne}</span> {`${teamsNames[0].substr(0, 14)}.`}
                    </Typography>

                    <Typography variant="h6" gutterBottom className={classes.score}>
                        {`${game.teamOneScore}-${game.teamTwoScore}`}
                    </Typography>

                    <Typography gutterBottom className={classes.scoreItem2}>
                        {`${teamsNames[1].substr(0, 14)}.`} <span style={{fontWeight: 700}}>{game.codeTwo}</span>
                    </Typography>
                </div>

                <div className={classes.rosterRoot} style={{height: viewPortH - 300}}>
                    <div
                        className={[classes.rosterWrapper, (game.offense === TEAM_ONE) && classes.rosterRootIsOffence].join(' ')}>
                        <div className={classes.roster}>
                            <GameControlRoster rosterID={rosters.teamOne}
                                               handlePlayerClick={game.offense === TEAM_ONE && !game.isPull ? this.handlePlayerClick : null}/>
                        </div>
                    </div>
                    <div
                        className={[classes.rosterWrapper, (game.offense === TEAM_TWO) && classes.rosterRootIsOffence].join(' ')}>
                        <div className={classes.roster}>
                            <GameControlRoster rosterID={rosters.teamTwo}
                                               handlePlayerClick={game.offense === TEAM_TWO && !game.isPull ? this.handlePlayerClick : null}/>
                        </div>
                    </div>
                </div>

                <div
                    className={[classes.throwAndTurnLine, (game.offense === TEAM_TWO) && classes.throwAndTurnLineReverse].join(' ')}>
                    {!game.isPull && (
                        <Button variant="outlined" color="secondary" className={classes.throw}
                                onClick={this.handleClick(THROW)}>
                            Пас!
                        </Button>
                    )}
                    {game.isPull && (
                        <Button variant="outlined" color="secondary" className={classes.throw}
                                onClick={this.handleClick(PULL)}>
                            Пулл!
                        </Button>
                    )}
                    {game.isPull && !game.inProgress && !game.isFinished && (
                        <Button variant="outlined" color="secondary" className={classes.throw}
                                onClick={this.handleClick(CHANGE_OFFENSE)}>
                            Сменить атаку!
                        </Button>
                    )}

                    {!game.isPull && (
                        <Button variant="outlined" color="primary" className={classes.turnOver}
                                onClick={this.handleClick(TURNOVER)}>
                            Турновер!
                        </Button>
                    )}
                </div>

                <div className={classes.othersButs}>
                    <GameControlOtherButs handleClick={this.handleClick} team={TEAM_ONE}/>
                    <GameControlOtherButs handleClick={this.handleClick} team={TEAM_TWO}/>
                </div>

                <div className={classes.inputLogLine}>
                    {`${assist !== null ? assist.name + ' -->' : ''}`}
                </div>

                <div className={classes.logWrapper}>
                    <div className={classes.gameLogPrev}>
                        {/*<GameControlLogPrev />*/}

                        <GameLog
                            gameID={gameID}
                            logID={game.logID}
                            preview
                            teamOneID = {game.teamOneID}
                            teamTwoID = {game.teamTwoID}
                        />
                    </div>

                    {log && log.logList.length > 0 &&
                        <Button size='small' variant="fab" className={classes.undo}
                                onClick={this.handleClick(UNDO)}>
                            <Undo fontSize="small" color="action"/>
                        </Button>
                    }

                    {!isUndoListEmpty &&
                        <Button size='small' variant="fab" className={classes.redo}
                                onClick={this.handleClick(REDO)}>
                            <Redo fontSize="small" color="action"/>
                        </Button>
                    }

                </div>

            </div>

        );
    }
}

GameControl.propTypes = {
    gameID: PropTypes.string.isRequired,
    //from store
    game: PropTypes.object.isRequired,
    rosters: PropTypes.object.isRequired,
    teamsNames: PropTypes.array.isRequired,
    gameControl: PropTypes.func.isRequired,
    isUndoListEmpty: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const {gameID} = ownProps;
    const gameData = state.games.list.get(gameID);
    const teamOneName = state.teams.list.get(gameData.teamOneID).name;
    const teamTwoName = state.teams.list.get(gameData.teamTwoID).name;
    const rosterTeamOne = state.teams.list.get(gameData.teamOneID).rosterID;
    const rosterTeamTwo = state.teams.list.get(gameData.teamTwoID).rosterID;
// debugger
    const log = !state.logs.list.isEmpty() ? state.logs.list.get(gameData.logID) : null;

    return {
        log: log,
        game: gameData,
        teamsNames: [teamOneName, teamTwoName],
        rosters: {teamOne: rosterTeamOne, teamTwo: rosterTeamTwo},
        isUndoListEmpty: state.undoList.list.isEmpty()
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        gameControl: (type, game, log, data) => dispatch(gameControl(type, game, log, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GameControl));

// #TODO добавить неизвестного игрока в ростер
