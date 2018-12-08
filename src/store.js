import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {routerMiddleware} from 'react-router-redux';
import history from './history';
import reducer from './Reducers'
import {loadState, saveState} from "./localstorage";
import throttle from "lodash/throttle";
import {OrderedMap, Record} from 'immutable';
import {convertPlainObjectToState} from "./helpers";
import {
    GameData,
    GamesState,
    TeamData,
    TeamsState,
    TournamentData,
    TournamentsListState,
    UserData,
    UserState
} from "./model";


// debugger
// {
//     Record,
//         convertPlainObjectToState,
//         GameData,
//         GamesState,
//         TeamData,
//         TeamsState,
//         TournamentData,
//         TournamentsListState,
//         UserData,
//         UserState,
//         OrderedMap
// }
const persistedStore = loadState();
// console.log('-----persistedStore', persistedStore);
// debugger

const enhancer = applyMiddleware(thunk, routerMiddleware(history));

const store = createStore(reducer, persistedStore, enhancer);

const unSubscribeLocalStorage = store.subscribe(throttle(() => {
   saveState(store.getState());
}, 1000));

//dev only
window.store = store;

export default store;