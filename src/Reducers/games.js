import {
    ADD, FAIL, GOAL, INJURY,
    LOAD_GAMES, LOG_ACTION, OTHER, PULL,
    SHOULD_RELOAD, SHOULD_UPLOAD, SOTG,
    START, SUCCESS,
    TEAM_ONE, TEAM_TWO, THROW, TIME_PAUSE, TIME_START, TIME_STOP, TIMEOUT, TURNOVER, UNDO,
    UPDATE_TIMER_GAME, UPLOAD_GAME
} from "../constants";
import {arrToMap, getReducedGameByType} from "../helpers";
import {GameData, GamesState} from "../model";

const defaultGamesState = GamesState();

export default (gamesState = defaultGamesState, action) => {
    const {type, payload} = action;

    switch (type) {
        case LOAD_GAMES + START:
            return gamesState
                .set('isLoading', true);

        case LOAD_GAMES + SUCCESS:
            const newList = arrToMap(payload, GameData);

            return gamesState
                .set('isLoading', false)
                .set('shouldReload', false)
                .set('list', gamesState.list
                    .merge(newList)
                );

        case LOAD_GAMES + SHOULD_RELOAD:
            return gamesState
                .set('shouldReload', true);

        case UPDATE_TIMER_GAME:
            const {gameID, time} = payload;

            return gamesState
                .set('list', gamesState.list
                    .set(gameID, gamesState.list.get(gameID)
                        .set('timePassed', time)));

        case UPLOAD_GAME + START:
            return gamesState
                .set('list', gamesState.list
                    .set(payload.id, gamesState.list.get(payload.id)
                        .set('isUploading', true)
                        .set('shouldUpload', false)
                    )
                );

        case UPLOAD_GAME + SUCCESS:
            return gamesState
                .set('list', gamesState.list
                    .set(payload.id, gamesState.list.get(payload.id)
                        .set('isUploading', false)
                    )
                );

        case UPLOAD_GAME + FAIL:
            return gamesState
                .set('list', gamesState.list
                    .set(payload.id, gamesState.list.get(payload.id)
                        .set('shouldUpload', true)
                    )
                );

        case UPLOAD_GAME + SHOULD_UPLOAD:
            return gamesState
                .set('list', gamesState.list
                    .set(payload.id, gamesState.list.get(payload.id)
                        .set('shouldUpload', true)
                    )
                );
        case LOG_ACTION + TIME_START:
            return gamesState
                .set('list', gamesState.list
                    .set(payload.game.id, gamesState.list.get(payload.game.id)
                        .set('inProgress', true)
                        .set('isTimeOn', true)
                        .set('isFinished', false)
                    )
                );

        case LOG_ACTION + TIME_PAUSE:
            return gamesState
                .set('list', gamesState.list
                    .set(payload.game.id, gamesState.list.get(payload.game.id)
                        .set('isTimeOn', false)
                        .set('isFinished', false)
                    )
                );

        case LOG_ACTION + TIME_STOP:
            return gamesState
                .set('list', gamesState.list
                    .set(payload.game.id, gamesState.list.get(payload.game.id)
                        .set('isTimeOn', false)
                        .set('inProgress', false)
                        .set('isFinished', true)
                    )
                );

        case LOG_ACTION + THROW:
            const teamPassesKey = payload.logLine.team === TEAM_ONE ? 'passesTeamOne' : 'passesTeamTwo';

            return gamesState
                .set('list', gamesState.list
                    .set(payload.game.id, gamesState.list.get(payload.game.id)
                        .set(teamPassesKey, gamesState.list.get(payload.game.id)[teamPassesKey] + 1)
                        .set('offense', payload.logLine.team)
                    )
                );

        case LOG_ACTION + GOAL:
            const teamScoreKey = payload.logLine.team === TEAM_ONE ? 'teamOneScore' : 'teamTwoScore';
            const inOffense = payload.game.offense === TEAM_ONE ? TEAM_TWO : TEAM_ONE;

            return gamesState
                .set('list', gamesState.list
                    .set(payload.game.id, gamesState.list.get(payload.game.id)
                        .set('isPull', true)
                        .set(teamScoreKey, +gamesState.list.get(payload.game.id)[teamScoreKey] + 1)
                        .set('offense', inOffense)
                    )
                );

        case LOG_ACTION + PULL:
            return gamesState
                .set('list', gamesState.list
                    .set(payload.game.id, gamesState.list.get(payload.game.id)
                        // .set('offense', teamOffence)
                            .set('isPull', false)
                    )
                );

        case LOG_ACTION + TURNOVER:
            const teamTurnoverKey = payload.logLine.team === TEAM_ONE ? 'teamOneTurnovers' : 'teamTwoTurnovers';

            return gamesState
                .set('list', gamesState.list
                    .set(payload.game.id, gamesState.list.get(payload.game.id)
                        .set(teamTurnoverKey, gamesState.list.get(payload.game.id)[teamTurnoverKey] + 1)
                        .set('offense', payload.logLine.team)
                    )
                );

        case LOG_ACTION + TIMEOUT:
            const teamTimeoutKey = payload.logLine.team === TEAM_ONE ? 'takenTimeOutsTeamOne' : 'takenTimeOutsTeamTwo';
            const timeOutsArr = gamesState.list.get(payload.game.id)[teamTimeoutKey].concat([payload.logLine.time]);

            return gamesState
                .set('list', gamesState.list
                    .set(payload.game.id, gamesState.list.get(payload.game.id)
                        .set(teamTimeoutKey, timeOutsArr)
                    )
                );

        case LOG_ACTION + SOTG:
            const teamSotgKey = payload.logLine.team === TEAM_ONE ? 'takenSotgTimeOutsTeamOne' : 'takenSotgTimeOutsTeamTwo';
            const sotgArr = gamesState.list.get(payload.game.id)[teamSotgKey].concat([payload.logLine.time]);

            return gamesState
                .set('list', gamesState.list
                    .set(payload.game.id, gamesState.list.get(payload.game.id)
                        .set(teamSotgKey, sotgArr)
                    )
                );

        case LOG_ACTION + INJURY:
            const teamInjuryKey = payload.logLine.team === TEAM_ONE ? 'injuryStoppageTeamOne' : 'injuryStoppageTeamTwo';
            const injuryAmount = gamesState.list.get(payload.game.id)[teamInjuryKey];

            return gamesState
                .set('list', gamesState.list
                    .set(payload.game.id, gamesState.list.get(payload.game.id)
                        .set(teamInjuryKey, +injuryAmount + 1)
                    )
                );

        case LOG_ACTION + OTHER:
            const teamOtherKey = payload.logLine.team === TEAM_ONE ? 'otherCallsTeamOne' : 'otherCallsTeamTwo';
            const otherAmount = gamesState.list.get(payload.game.id)[teamOtherKey];

            return gamesState
                .set('list', gamesState.list
                    .set(payload.game.id, gamesState.list.get(payload.game.id)
                        .set(teamOtherKey, +otherAmount + 1)
                    )
                );

        case UNDO + ADD:
            // debugger
            const actionType = payload.logLine.type;
            const newGame = getReducedGameByType(actionType, payload.game, payload.logLine);

            return gamesState
                .set('list', gamesState.list
                    .set(payload.game.id, newGame)
                );

        default:
            return gamesState;

    }
}