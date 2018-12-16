import {OrderedMap, Map, Record} from 'immutable'
import {
    GOAL,
    INJURY,
    OTHER,
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
            return {backgroundColor: '#ffbeb4'};
        default:
            return null;
    }
}

export function getLogLineToRender(logLine, players, rosterTeamOne, rosterTeamTwo) {
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
            // details = '';
            break;
        case THROW:
            // details = '';
            break;
        case TIMEOUT:
            // details = '';
            break;
        case SOTG:
            // details = '';
            break;
        case INJURY:
            // details = '';
            break;
        case OTHER:
            // details = '';
            break;
        case TIME_STOP:
            // details = '';
            break;
        case TIME_START:
            // details = '';
            break;
        case TIME_PAUSE:
            // details = '';
            break;
        default:
            details = 'Неизвестное действие';
    }

    return {time, score, details};
}
