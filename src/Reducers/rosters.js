import {LOAD_ROSTERS, SHOULD_RELOAD, START, SUCCESS} from "../constants";
import {arrToMap} from "../helpers";
import {RosterData, RostersState} from "../model";

const defaultRostersState = RostersState();

export default (rostersState = defaultRostersState, action) => {
    const {type, payload} = action;

    switch (type) {

        case LOAD_ROSTERS + START:
            // debugger
            return rostersState
                .set('isLoading', true);

        case LOAD_ROSTERS + SUCCESS:
            return rostersState
                .set('isLoading', false)
                .set('shouldReload', false)
                .set('list', arrToMap(payload, RosterData));

        case LOAD_ROSTERS + SHOULD_RELOAD:
            return rostersState
                .set('shouldReload', true);
        default:
            return rostersState;

    }
}