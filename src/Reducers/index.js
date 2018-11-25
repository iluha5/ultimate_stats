import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import bearer from "./bearer";
import user from "./user";
import tournamentsList from './tournamentsList';

export default combineReducers({
    router: routerReducer,
    bearer,
    user,
    tournamentsList,
})