import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles/index";
import AppDrawer from "./AppDrawer";
import {
    DRAWER_WIDTH, FORCE_UPLOAD_GAME,
    TIME_PAUSE,
    TIME_START, TIME_STOP,
} from "../constants";
import GameTimer from "./GameTimer";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import GameControl from "./GameControl";
import GameLog from "./GameLog";
import {
    gameControl,
    loadGames,
    loadLog,
    loadRosters,
    updateGameTimer,
    loadPlayers,
    clearGame
} from "../AC";
import GameViewLog from "./GameViewLog";
import {saveGameAndLog} from "../helpers";


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
            paddingTop: 48,
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

class Game extends Component {
    state = {
        isTimerOn: false,
        tabValue: 0,
        isForceLoadFromServer: false,
    };

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

    handlerForceUploadGame = () => {
      const {game, gameControl} = this.props;

      gameControl(FORCE_UPLOAD_GAME, game);
    };

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    forceUpdateFromServer = () => {
        const {loadGames, loadLog, loadPlayers, loadRosters, game} = this.props;

        if (window.confirm('Загрузить версию игры с сервера? (возможна потеря последних данных, введенных с Вашего устройства)')) {
            loadGames();
            loadLog(game.logID);
            loadPlayers();
            loadRosters();
            // updateGameTimer(game.id, game.timePassed)
        }
    };

    forceEraseGame = () => {
        const {game, clearGame} = this.props;

        if (window.confirm('Внимание! Вы сотрете все данные об игре без возможности восстановления! Продолжить?')) {
            clearGame(game);
        }

    };

    handleSaveGame = () => {
        const {game, log} = this.props;
        console.log('-----', );
        saveGameAndLog(game, log);
    };


    render() {
        const {classes, id, game} = this.props;
        const {tabValue} = this.state;

        return (
            <div>
                <AppDrawer
                    title={<GameTimer gameID={id} initialTime={game.timePassed ? game.timePassed : 0}
                                      isTimerOn={game.isTimeOn} isGameInProgress={game.inProgress}/>}
                    isGame
                    isTimerOn={game.isTimeOn}
                    toggleTimer={this.toggleTimer}
                    handlerStop={this.handlerStop}
                    handlerForceUploadGame={this.handlerForceUploadGame}
                    forceUpdateFromServer={this.forceUpdateFromServer}
                    forceEraseGame={this.forceEraseGame}
                    uploadingStatus={game.isUploading}
                    saveGame = {this.handleSaveGame}

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
                            <Tab label="Ход игры" className={classes.tab}/>
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
                        <GameLog
                            gameID={id}
                            logID={game.logID}
                            teamOneID = {game.teamOneID}
                            teamTwoID = {game.teamTwoID}
                        />
                    </TabContainer>
                    }
                    {tabValue === 2 &&
                    <TabContainer>
                        Статистика
                    </TabContainer>
                    }
                    {tabValue === 3 &&
                    <TabContainer>
                        <GameViewLog
                            gameID={id}
                            logID={game.logID}
                            teamOneID = {game.teamOneID}
                            teamTwoID = {game.teamTwoID}
                        />
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
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const {id} = ownProps;
    return {
        user: state.user.userData,
        game: state.games.list.get(id),
        log: state.logs.list.get(state.games.list.get(id).logID)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadGames: () => dispatch(loadGames()),
        loadLog: (logID) => dispatch(loadLog(logID)),
        loadRosters: () => dispatch(loadRosters()),
        loadPlayers: () => dispatch(loadPlayers()),
        clearGame: (game) => dispatch(clearGame(game)),
        updateGameTimer: (gameID, time) => dispatch(updateGameTimer(gameID, time)),
        gameControl: (type, game, log) => dispatch(gameControl(type, game, log)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(Game));
