import {OrderedMap, OrderedSet, Record} from "immutable";
import {LOAD_TEAMS, LOAD_USERS, SHOULD_RELOAD, START, SUCCESS} from "../constants";
import {arrToMap} from "../helpers";
import {TournamentData, TournamentsListState} from "../model";

const defaultTournamentList = TournamentsListState();

const convertPlainObjectToTournamentsListState = (tournamentsListState) => {
    if (tournamentsListState && tournamentsListState.list && Object.keys(tournamentsListState.list).length !== 0) {

        let newMap = Object.keys(tournamentsListState.list).map(key => {
                return {
                    [key]: TournamentData(tournamentsListState.list[key])
                }
            }
        );

        // debugger
        return TournamentsListState({
            isLoading: tournamentsListState.isLoading,
            list: new OrderedMap(newMap)
        })
    }

    return defaultTournamentList;
};


export default (tournamentsListState = defaultTournamentList, action) => {
    const {type, payload} = action;

    switch (type) {
        case LOAD_TEAMS + START:
            return tournamentsListState
                .set('isLoading', true);

        case LOAD_TEAMS + SUCCESS:
            return tournamentsListState
                .set('isLoading', false)
                .set('shouldReload', false)
                .set('list', arrToMap(payload, TournamentData));

        case LOAD_TEAMS + SHOULD_RELOAD:
            return tournamentsListState
                .set('shouldReload', true);
        default:
            return tournamentsListState;
    }

}