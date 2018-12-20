import {OrderedMap, Record} from "immutable";
import {
    FAIL,

    LOAD_GAMES,
    LOAD_TEAMS, LOG_ACTION, PULL,
    SHOULD_RELOAD, SHOULD_UPLOAD,
    START,
    SUCCESS,
    TEAM_ONE, TEAM_TWO, THROW, TURNOVER,
    UPDATE_TIMER_GAME, UPLOAD_GAME
} from "../constants";
import {arrToMap} from "../helpers";
import {GameData, GamesState} from "../model";

const defaultGamesState = GamesState();

export default (gamesState = defaultGamesState, action) => {
    const {type, payload} = action;

    switch (type) {
        case LOAD_GAMES + START:
            return gamesState
                .set('isLoading', true);

        case LOAD_GAMES + SUCCESS:
            // debugger

            let st = gamesState
                .set('isLoading', false)
                .set('shouldReload', false)
                .set('list', arrToMap(payload, GameData));

            // debugger

            return st;

        case LOAD_GAMES + SHOULD_RELOAD:
            return gamesState
                .set('shouldReload', true);

        case UPDATE_TIMER_GAME:
            const {gameID, time} = payload;
// debugger
            return gamesState
            // .set(['list', gameID, 'timePassed'], time);
                .set('list', gamesState.list
                    .set(gameID, gamesState.list.get(gameID)
                        .set('timePassed', time)))

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

        case LOG_ACTION + THROW:
            const teamPassesKey = payload.logLine.team === TEAM_ONE ? 'passesTeamOne' : 'passesTeamTwo';

            // console.log('-----gamesState.list.get(payload.game.id)[teamPassesKey]++', gamesState.list.get(payload.game.id)[teamPassesKey] + 1);
            return gamesState
                .set('list', gamesState.list
                    .set(payload.game.id, gamesState.list.get(payload.game.id)
                        .set(teamPassesKey, gamesState.list.get(payload.game.id)[teamPassesKey] + 1)
                        .set('offense', payload.logLine.team)
                    )
                );

        case LOG_ACTION + PULL:
            const teamOffence = payload.logLine.team === TEAM_ONE ? TEAM_TWO : TEAM_ONE;

            // console.log('-----gamesState.list.get(payload.game.id)[teamPassesKey]++', gamesState.list.get(payload.game.id)[teamPassesKey] + 1);
            return gamesState
                .set('list', gamesState.list
                    .set(payload.game.id, gamesState.list.get(payload.game.id)
                        .set('offense', teamOffence)
                    )
                );

        case LOG_ACTION + TURNOVER:
            const teamTurnoverKey = payload.logLine.team === TEAM_ONE ? 'teamTwoTurnovers' : 'teamOneTurnovers';

console.log('-----gamesState.list.get(payload.game.id)', gamesState.list.get(payload.game.id));
            return gamesState
                .set('list', gamesState.list
                    .set(payload.game.id, gamesState.list.get(payload.game.id)
                        .set(teamTurnoverKey, gamesState.list.get(payload.game.id)[teamTurnoverKey] + 1)
                        .set('offense', payload.logLine.team === TEAM_ONE ? TEAM_TWO : TEAM_ONE)
                    )
                );

        default:
            return gamesState;

    }
}