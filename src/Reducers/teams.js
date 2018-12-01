
import {OrderedMap, Record} from "immutable";
import {LOAD_ALL_TEAMS, LOAD_TEAMS, SHOULD_RELOAD, START, SUCCESS} from "../constants";
import {arrToMap} from "../helpers";

const TeamsData = Record({
    id: '',
    name: '',
    players: '',
    games: '',
});

const TeamsState = Record({
    isLoading: false,
    shouldReload: true,
    list: new OrderedMap({})
});
const defaultTeamsState = TeamsState();

const convertPlainObjectToTeamsState = (teamsState) => {
    if (teamsState && teamsState.list && Object.keys(teamsState.list).length !== 0) {
        let newMap = Object.keys(teamsState.list).map(key => {
                return {
                    [key]: TeamsData(teamsState.list[key])
                }
            }
        );

        return TeamsState({
            isLoading: teamsState.isLoading,
            list: new OrderedMap(newMap)
        })
    }

    return defaultTeamsState;
};

export default (teamsState = defaultTeamsState, action) => {
    const {type, payload} = action;

    if (!Record.isRecord(teamsState)) {
        teamsState = convertPlainObjectToTeamsState(teamsState);
    }

    switch (type) {
        case LOAD_ALL_TEAMS + START:
            return teamsState
                .set('isLoading', true);

        case LOAD_ALL_TEAMS + SUCCESS:
            debugger
            return teamsState
                .set('isLoading', false)
                .set('shouldReload', false)
                .set('list', arrToMap(payload, TeamsData));

        case LOAD_ALL_TEAMS + SHOULD_RELOAD:
            return teamsState
                .set('shouldReload', true);
        default:
            return teamsState;

    }
}