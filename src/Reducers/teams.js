import {LOAD_ALL_TEAMS, SHOULD_RELOAD, START, SUCCESS} from "../constants";
import {arrToMap} from "../helpers";
import {TeamData, TeamsState} from "../model";

const defaultTeamsState = TeamsState();

export default (teamsState = defaultTeamsState, action) => {
    const {type, payload} = action;

    switch (type) {
        case LOAD_ALL_TEAMS + START:
            return teamsState
                .set('isLoading', true);

        case LOAD_ALL_TEAMS + SUCCESS:
            return teamsState
                .set('isLoading', false)
                .set('shouldReload', false)
                .set('list', arrToMap(payload, TeamData));

        case LOAD_ALL_TEAMS + SHOULD_RELOAD:
            return teamsState
                .set('shouldReload', true);
        default:
            return teamsState;

    }
}