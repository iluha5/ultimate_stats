import {LOAD_PLAYERS, SHOULD_RELOAD, START, SUCCESS} from "../constants";
import {arrToMap} from "../helpers";
import {PlayerData, PlayersState} from "../model";

const defaultPlayersState = PlayersState();

export default (playersState = defaultPlayersState, action) => {
    const {type, payload} = action;

    switch (type) {
        case LOAD_PLAYERS + START:
            return playersState
                .set('isLoading', true);

        case LOAD_PLAYERS + SUCCESS:
            return playersState
                .set('isLoading', false)
                .set('shouldReload', false)
                .set('list', arrToMap(payload, PlayerData));

        case LOAD_PLAYERS + SHOULD_RELOAD:
            return playersState
                .set('shouldReload', true);
        default:
            return playersState;

    }
}