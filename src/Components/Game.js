import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles/index";
import AppDrawer from "./AppDrawer";
import {
    DRAWER_WIDTH,
    GAME_START,
    NOW_UPLOADING,
    SHOULD_UPLOAD,
    STANDBY, TIME_PAUSE,
    TIME_START, TIME_STOP,
    UPLOAD_INTERVAL
} from "../constants";
import GameTimer from "./GameTimer";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import GameControl from "./GameControl";
import GameLog from "./GameLog";
import {
    gameControl,
    gameShouldUpload,
    loadGames,
    loadLog,
    loadPlayers,
    loadRosters,
    updateGame,
    updateGameStart, updateGameTimer,
    updateLog
} from "../AC";
import store from "../store";
import throttle from "lodash/throttle";
import Overlay from "./Overlay";


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
        paddingTop: 32,

    },
    tab: {
        minHeight: 30,
    }
});

function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 0}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

// let uploadIntervalID;

class Game extends Component {
    state = {
        isTimerOn: false,
        tabValue: 0,
        isForceLoadFromServer: false,
    };


    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    componentDidUpdate(prevProps, prevState) {
        const {game, log} = this.props;

        this.shouldGameUpload = game.shouldUpload;
        this.shouldLogUpload = log.shouldUpload;

    }
    ;

    toggleTimer = () => {
        const {game, gameControl} = this.props;

        !game.isTimeOn && gameControl(TIME_START, game);
        game.isTimeOn && gameControl(TIME_PAUSE, game);
    };

    handlerStop = () => {
        const {game, gameControl} = this.props;

        if (!game.inProgress) {
            window.alert('Не могу завершить игру! Игра не запущена.');
            return 0;
        }

        window.confirm('Вы хотите завершить игру?') && !game.isFinished && gameControl(TIME_STOP, game);

    };

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    forceUpdateFromServer = () => {
        const {loadGames, loadLog, loadPlayers, loadRosters, game, updateGameTimer} = this.props;

        if (window.confirm('Загрузить версию игры с сервера? (возможна потеря последних данных, введенных с Вашего устройства)')) {
            loadGames();
            loadLog(game.logID);
            loadPlayers();
            loadRosters();
            // updateGameTimer(game.id, game.timePassed)
        }

    };

    handleChangeIndex = index => {
        this.setState({tabValue: index});
    };

    render() {
        const {classes, id, game} = this.props;
        const {tabValue} = this.state;
        // console.log('-----timePassed', game.timePassed);
        // console.log('-----game.timePassed', game.timePassed);
        // debugger

        return (
            <div>
                <AppDrawer
                    title={<GameTimer gameID={id} initialTime={game.timePassed ? game.timePassed : 0}
                                      isTimerOn={game.isTimeOn} isGameInProgress={game.inProgress}/>}
                    isGame
                    isTimerOn={game.isTimeOn}
                    toggleTimer={this.toggleTimer}
                    handlerStop={this.handlerStop}
                    forceUpdateFromServer={this.forceUpdateFromServer}
                    uploadingStatus={game.isUploading}
                />
                <main className={classes.content}>
                    <AppBar position="static" color="default" className={classes.tabs}>
                        <Tabs
                            value={tabValue}
                            onChange={this.handleChangeTab}
                            scrollable
                            scrollButtons="off"
                            indicatorColor="primary"
                            textColor="primary"
                            className={classes.tab}
                        >
                            <Tab label="Управление" className={classes.tab}/>
                            <Tab label="Лог" className={classes.tab}/>
                            <Tab label="Статистика" className={classes.tab}/>
                        </Tabs>
                    </AppBar>

                    {tabValue === 0 &&
                    <TabContainer>
                        {/*{!game.inProgress && <Overlay message='Игра не запущена' />}*/}
                        <GameControl gameID={id}/>
                    </TabContainer>
                    }
                    {tabValue === 1 &&
                    <TabContainer>
                        <GameLog gameID={id} logID={game.logID}/>
                    </TabContainer>
                    }
                    {tabValue === 2 &&
                    <TabContainer>
                        Статистика
                    </TabContainer>
                    }
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
    game: PropTypes.object.isRequired,
    log: PropTypes.object.isRequired,
    // teams: PropTypes.object.isRequired,
    // rosters: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const {id} = ownProps;
    return {
        user: state.user.userData,
        game: state.games.list.get(id),
        log: state.logs.list.get(state.games.list.get(id).logID)
        // teams: state.teams.list,
        // rosters: state.rosters,
        // timePassed: state.games.list.get(id).timePassed
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadGames: () => dispatch(loadGames()),
        loadLog: (logID) => dispatch(loadLog(logID)),
        loadRosters: () => dispatch(loadRosters()),
        loadPlayers: () => dispatch(loadPlayers()),
        updateGame: (game) => dispatch(updateGame(game)),
        updateLog: (log) => dispatch(updateLog(log)),
        // updateGameStart: (gameID, data) => dispatch(updateGameStart(gameID, data)),
        updateGameTimer: (gameID, time) => dispatch(updateGameTimer(gameID, time)),
        gameControl: (type, game, log) => dispatch(gameControl(type, game, log)),

        gameShouldUpload: (game) => dispatch(gameShouldUpload(game)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(Game));
