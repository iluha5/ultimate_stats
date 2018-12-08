import {OrderedMap, Record} from "immutable";
import {
    LOAD_ALL_TEAMS,
    LOAD_GAMES,
    LOAD_TEAMS,
    SHOULD_RELOAD,
    START,
    SUCCESS,
    TEAM_ONE,
    UPDATE_TIMER_GAME
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
            return gamesState
                .set('isLoading', false)
                .set('shouldReload', false)
                .set('list', arrToMap(payload, GameData));

        case LOAD_GAMES + SHOULD_RELOAD:
            return gamesState
                .set('shouldReload', true);

        case UPDATE_TIMER_GAME:
            const {gameID, time} = payload;
// debugger
            return gamesState
                // .set(['list', gameID, 'timePassed'], time);
                .set('list', gamesState.list.set( gameID, gamesState.list.get(gameID).set('timePassed', time) ))

        default:
            return gamesState;

    }
}