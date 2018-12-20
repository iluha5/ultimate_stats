import {OrderedMap, Map, Record} from 'immutable'
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

export function arrToMap(arr, DataRecord = Map) {
    // debugger
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

export function convertLogToRecord(logsState, LogData, LogLineData, LogsState, defaultLogState, OrderedMap) {
    // debugger
    if (logsState && logsState.list && Object.keys(logsState.list).length !== 0) {

        const newMap = Object.keys(logsState.list).reduce((acc, key) => {
            let logLines = [];

            if (Array.isArray(logsState.list[key].logList)) {
                logLines = logsState.list[key].logList.map(logLine => LogLineData(logLine));
            } else {
            console.log('-----logsState.list[key].logList не массив! Вот logsState.list[key]', logsState.list[key]);
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

export function convertLogObjToRecord(log, LogLineData = Map) {
    const newList = log.list.map(line => LogLineData(line));
    return {...log, list: newList};
}

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
    const time = logLine.time;
    let score = `${logLine.currScoreTeamOne} - ${logLine.currScoreTeamTwo}`;
    let details = `${logLine.type}`;
    // const rosterTeamOne = rosters.get(teams.get(game.teamOneID).rosterID);
    // const rosterTeamTwo = rosters.get(teams.get(game.teamTwoID).rosterID);

    switch (logLine.type) {
        case GOAL:
            // debugger
            let playerAssist = '';
            let playerGoal = '';
            const playerAssistNum = logLine.team === TEAM_ONE ?
                rosterTeamOne.players.find(player => player.id === logLine.playerAssist).num :
                rosterTeamTwo.players.find(player => player.id === logLine.playerAssist).num;

            const playerGoalNum = logLine.team === TEAM_ONE ?
                rosterTeamOne.players.find(player => player.id === logLine.playerGoal).num :
                rosterTeamTwo.players.find(player => player.id === logLine.playerGoal).num;
// debugger
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
            details = `Турновер. Атака: ${teamNames[logLine.team]}`;
            break;
        case THROW:
            details = `Бросок: ${teamNames[logLine.team].substr(0, 15)}.`;
            break;
        case TIMEOUT:
            details = `Таймаут: ${teamNames[logLine.team].substr(0, 15)}.`;
            break;
        case SOTG:
            details = `Спирит. таймаут: ${teamNames[logLine.team].substr(0, 15)}.`;
            break;
        case INJURY:
            details = `Остановка по травме: ${teamNames[logLine.team].substr(0, 15)}.`;
            break;
        case OTHER:
            details = `Прочая остановка: ${teamNames[logLine.team].substr(0, 15)}.`;
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
            details = `Пулл: ${teamNames[logLine.team].substr(0, 15)}.`;
            break;
        default:
            details = 'Неизвестное действие';
    }

    return {time, score, details};
}

// export function getActionByType(type) {
//
//     switch (type) {
//         case GOAL:
//         case TURNOVER:
//         case THROW:
//         case TIMEOUT:
//         case SOTG:
//         case INJURY:
//         case OTHER:
//         case TIME_STOP:
//         case TIME_START:
//         case TIME_PAUSE:
//         case PULL:
//             return gameControl(type);
//         default:
//     }
//
// }

export function getMyGamesInProgress(games, userID) {
    let result = [];
    games.forEach(game => {
        if (game.ownerID === userID && game.inProgress){
            result.push(game.id);
        }
    });

    return result;
}