import {OrderedMap, Record} from "immutable";
import {LOAD_ALL_TEAMS, LOAD_GAMES, LOAD_TEAMS, SHOULD_RELOAD, START, SUCCESS, TEAM_ONE} from "../constants";
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
        default:
            return gamesState;

    }
}