import {OrderedMap, OrderedSet, Record} from "immutable";
import {LOAD_TOURNAMENTS, LOAD_USERS, START, SUCCESS} from "../constants";
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
    list: new OrderedMap({})
});
const defaultTournamentList = TournamentsListState();


const convertPlainObjectToTournamentsListState = (tournamentsListState) => {
    if (tournamentsListState && tournamentsListState.list) {

        return TournamentsListState({
            isLoading: tournamentsListState.isLoading,
            list: new OrderedMap(tournamentsListState.list)
        })
    }

    return defaultTournamentList;
};


export default (tournamentsListState = defaultTournamentList, action) => {
    const {type, payload} = action;
// debugger
    if (!Record.isRecord(tournamentsListState)) {
        tournamentsListState = convertPlainObjectToTournamentsListState(tournamentsListState);
    }


    switch (type) {
        case LOAD_TOURNAMENTS + START:
            return tournamentsListState
                .set('isLoading', true);

        case LOAD_TOURNAMENTS + SUCCESS:
            return tournamentsListState
                .set('isLoading', false)
                .set('list', arrToMap(payload, TournamentData));
    }

    return tournamentsListState;
}