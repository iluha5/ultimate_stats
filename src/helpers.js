import {OrderedMap, Map} from 'immutable'
import {
    GOAL,
    INJURY,
    OTHER, PULL,
    SOTG, TEAM_ONE,
    THROW,
    TIME_PAUSE,
    TIME_START,
    TIME_STOP,
    TIMEOUT,
    TURNOVER,
    UNDEFINED_PLAYER
} from "./constants";
import FileSaver from 'file-saver';

export function saveGameAndLog(game = {}, log = {}) {
    const content = {
        game: game,
        log: log
    };

    const file = new File([JSON.stringify(content, null, '\t')], `game_${game.id}`, {type : 'application/json'});
    FileSaver.saveAs(file);
}

export function arrToMap(arr, DataRecord = Map) {
    return arr.reduce((acc, item) =>
            acc.set(item.id, DataRecord(item))
        , OrderedMap({}))
}

export function arrToDataArr(arr, DataRecord = Map) {
    return arr.map(item => DataRecord(item))
}

export function mapToArr(obj) {
    return obj.valueSeq().toArray()
}

export function convertLogToRecord(logsState, LogData, LogLineData, LogsState, defaultLogState, OrderedMap, GameData) {
    if (logsState && logsState.list && Object.keys(logsState.list).length !== 0) {

        const newMap = Object.keys(logsState.list).reduce((acc, key) => {
                let logLines = [];

                if (Array.isArray(logsState.list[key].logList)) {

                    logLines = logsState.list[key].logList.map(
                        logLine => {
                            return LogLineData(Object.assign({}, logLine, {gameSnapshot: GameData(logLine.gameSnapshot)}))
                        }
                    );
                }

                acc[key] = LogData({...logsState.list[key], logList: logLines});
                return acc;
            }
            , {}
        );

        return LogsState({list: OrderedMap(newMap)})
    }

    return defaultLogState;
}

////////// Testing purpose!
// export function convertLogObjToRecord(log, LogLineData = Map) {
//     const newList = log.list.map(line => LogLineData(line));
//     return {...log, list: newList};
// }

export function convertPlainObjectToState(state, DataRecord, defaultState, DataStateRecord, OrderedMap, listKey = 'list') {
    if (state && state[listKey] && Object.keys(state[listKey]).length !== 0) {

        let newMap;
        if (listKey === 'list') {
            newMap = Object.keys(state.list).reduce((acc, key) => {
                    acc[key] = DataRecord(state.list[key]);
                    return acc;
                }
                , {}
            );
        }

        let data;
        switch (listKey) {
            case 'list':
                data = OrderedMap(newMap);
                break;
            case 'userData':
                data = DataRecord(state[listKey]);
                break;
            default:
        }

        return DataStateRecord({
            isLoading: state.isLoading,
            [listKey]: data
        })
    }

    return defaultState;
}

export function getColorForLogLine(type) {
    switch (type) {
        case GOAL:
            return {backgroundColor: '#caffd8'};
        case TURNOVER:
            return {backgroundColor: '#fff09b'};
        case TIME_STOP:
        case TIME_START:
        case TIME_PAUSE:
            return {backgroundColor: '#ffa7ac'};
        default:
            return null;
    }
}

export function getLogLineToRender(logLine, players, rosterTeamOne, rosterTeamTwo, teamNames) {
    const time = +logLine.time;
    let score = `${logLine.currScoreTeamOne} - ${logLine.currScoreTeamTwo}`;
    let details = `${logLine.type}`;
    const teamName = teamNames[logLine.team] || '';

    switch (logLine.type) {
        case GOAL:
            let playerAssist = '';
            let playerGoal = '';
            const playerAssistNum = logLine.team === TEAM_ONE ?
                rosterTeamOne.players.find(player => player.id === logLine.playerAssist).num :
                rosterTeamTwo.players.find(player => player.id === logLine.playerAssist).num;

            const playerGoalNum = logLine.team === TEAM_ONE ?
                rosterTeamOne.players.find(player => player.id === logLine.playerGoal).num :
                rosterTeamTwo.players.find(player => player.id === logLine.playerGoal).num;

            if (logLine.playerAssist === logLine.playerGoal) {
                details = `Кэллахан - ${players.get(logLine.playerGoal).secondName}`;
            }

            playerAssist = logLine.playerAssist === UNDEFINED_PLAYER ? 'Неизвестный' :
                `#${playerAssistNum} ${players.get(logLine.playerAssist).secondName} ${players.get(logLine.playerAssist).firstName[0]} `;
            playerGoal = logLine.playerGoal === UNDEFINED_PLAYER ? 'Неизвестный' :
                `#${playerGoalNum} ${players.get(logLine.playerGoal).secondName} ${players.get(logLine.playerGoal).firstName[0]} `;

            details = `${playerAssist} -> ${playerGoal}`;
            score = logLine.team === TEAM_ONE ? `${logLine.currScoreTeamOne}.- ${logLine.currScoreTeamTwo}` : `${logLine.currScoreTeamOne} -.${logLine.currScoreTeamTwo}`;
            break;
        case TURNOVER:
            details = `Турновер. Атака: ${teamName}`;
            break;
        case THROW:
            details = `Бросок: ${teamName.substr(0, 15)}.`;
            break;
        case TIMEOUT:
            // debugger
            details = `Таймаут: ${teamName.substr(0, 15)}.`;
            break;
        case SOTG:
            details = `Спирит. таймаут: ${teamName.substr(0, 15)}.`;
            break;
        case INJURY:
            details = `Остановка по травме: ${teamName.substr(0, 15)}.`;
            break;
        case OTHER:
            details = `Прочая остановка: ${teamName.substr(0, 15)}.`;
            break;
        case TIME_STOP:
            details = `ИГРА ОКОНЧЕНА!`;
            break;
        case TIME_START:
            details = `ВРЕМЯ ПОШЛО!`;
            break;
        case TIME_PAUSE:
            details = `ВРЕМЯ ОСТАНОВЛЕНО!!`;
            break;
        case PULL:
            details = `Пулл: ${teamName.substr(0, 15)}.`;
            break;
        default:
            details = 'Неизвестное действие';
    }

    return {time, score, details};
}

export function getLogLineToRenderView(logLine, players, rosterTeamOne, rosterTeamTwo, teamNames) {
    const time = +logLine.time;
    let score = `${logLine.currScoreTeamOne} - ${logLine.currScoreTeamTwo}`;
    let details = `${logLine.type}`;

    switch (logLine.type) {
        case GOAL:
            let playerAssist = '';
            let playerGoal = '';
            const playerAssistNum = logLine.team === TEAM_ONE ?
                rosterTeamOne.players.find(player => player.id === logLine.playerAssist).num :
                rosterTeamTwo.players.find(player => player.id === logLine.playerAssist).num;

            const playerGoalNum = logLine.team === TEAM_ONE ?
                rosterTeamOne.players.find(player => player.id === logLine.playerGoal).num :
                rosterTeamTwo.players.find(player => player.id === logLine.playerGoal).num;

            if (logLine.playerAssist === logLine.playerGoal) {
                details = `Кэллахан - ${players.get(logLine.playerGoal).secondName}`;
            }
            playerAssist = logLine.playerAssist === UNDEFINED_PLAYER ? 'Неизвестный' :
                `#${playerAssistNum} ${players.get(logLine.playerAssist).secondName} ${players.get(logLine.playerAssist).firstName[0]} `;
            playerGoal = logLine.playerGoal === UNDEFINED_PLAYER ? 'Неизвестный' :
                `#${playerGoalNum} ${players.get(logLine.playerGoal).secondName} ${players.get(logLine.playerGoal).firstName[0]} `;

            details = `${playerAssist} -> ${playerGoal}`;
            score = logLine.team === TEAM_ONE ? `${logLine.currScoreTeamOne}.- ${logLine.currScoreTeamTwo}` : `${logLine.currScoreTeamOne} -.${logLine.currScoreTeamTwo}`;
            break;
        case TURNOVER:
            details = `Турновер`;
            break;
        case THROW:
            details = `Бросок`;
            break;
        case TIMEOUT:
            details = `Таймаут`;
            break;
        case SOTG:
            details = `Спирит. таймаут`;
            break;
        case INJURY:
            details = `Остановка по травме`;
            break;
        case OTHER:
            details = `Прочая остановка`;
            break;
        case TIME_STOP:
            details = null;
            break;
        case TIME_START:
            details = null;
            break;
        case TIME_PAUSE:
            details = null;
            break;
        case PULL:
            details = `Пулл`;
            break;
        default:
            details = 'Неизвестное действие';
    }

    return logLine.team === TEAM_ONE ? {time, score, team_one: details} : {time, score, team_two: details};
}


export function getMyGamesInProgress(games, userID) {
    let result = [];
    games.forEach(game => {
        if (game.ownerID === userID && game.inProgress) {
            result.push(game.id);
        }
    });

    return result;
}

///////////// Testing purpose!
// export function getReducedGameByType(type, game, logLine) {
//
//     switch (type) {
//         case TIME_START:
//             return game
//                 .set('inProgress', false)
//                 .set('isTimeOn', false);
//
//         case TIME_PAUSE:
//             return game
//                 .set('isTimeOn', true)
//                 .set('isFinished', false);
//
//         case TIME_STOP:
//             return game
//                 .set('isTimeOn', false) // хак, чтобы не обрабатывать предыдущее (неизвестное) состояние игры
//                 .set('inProgress', true)
//                 .set('isFinished', false)
//                 .set('win', "");
//
//         case THROW:
//             const teamPassesKey = logLine.team === TEAM_ONE ? 'passesTeamOne' : 'passesTeamTwo';
//
//             return game
//                 .set(teamPassesKey, +game[teamPassesKey] - 1 >= 0 ? +game[teamPassesKey] - 1 : 0);
//
//         case GOAL:
//             const teamScoreKey = logLine.team === TEAM_ONE ? 'teamOneScore' : 'teamTwoScore';
//             const inOffense = game.offense === TEAM_ONE ? TEAM_TWO : TEAM_ONE;
//
//             return game
//                 .set(teamScoreKey, +game[teamScoreKey] - 1)
//                 .set('offense', inOffense);
//
//         case PULL:
//             return game
//                 .set('isPull', true);
//
//         default:
//             return game;
//     }
// }