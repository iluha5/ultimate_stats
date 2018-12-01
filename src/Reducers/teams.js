
import {OrderedMap, Record} from "immutable";

const TeamsData = Record({
    id: '',
    name: '',
    players: '',
    games: '',
});

const TeamsState = Record({
    isLoading: false,
    shouldReload: false,
    list: new OrderedMap({})
});
const defaultTournamentList = TeamsState();
