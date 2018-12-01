import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import bearer from "./bearer";
import user from "./user";
import tournamentsList from './tournamentsList';
import teams from "./teams";

export default combineReducers({
    router: routerReducer,
    bearer,
    user,
    tournamentsList,
    teams,
})