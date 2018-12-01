import {OrderedMap, OrderedSet, Record} from "immutable";
import {LOAD_TOURNAMENTS, LOAD_USERS, SHOULD_RELOAD, START, SUCCESS} from "../constants";
import {arrToMap} from "../helpers";

const TournamentData = Record({
    id: '',
    name: '',
    country: '',
    place: '',
    dateStart: '',
    dateEnd: '',
    covering: '',
    format: '',
    games: null,
    teams: null,
    isMenDivision: false,
    isWomenDivision: false,
    isMixDivision: false,
    ownerId: ''
});

const TournamentsListState = Record({
    isLoading: false,
    shouldReload: true,
    list: new OrderedMap({})
});
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
// debugger
    if (!Record.isRecord(tournamentsListState)) {
        tournamentsListState = convertPlainObjectToTournamentsListState(tournamentsListState);
        // debugger
    }


    switch (type) {
        case LOAD_TOURNAMENTS + START:
            return tournamentsListState
                .set('isLoading', true);

        case LOAD_TOURNAMENTS + SUCCESS:
            return tournamentsListState
                .set('isLoading', false)
                .set('shouldReload', false)
                .set('list', arrToMap(payload, TournamentData));

        case LOAD_TOURNAMENTS + SHOULD_RELOAD:
            return tournamentsListState
                .set('shouldReload', true);

    }

    return tournamentsListState;
}