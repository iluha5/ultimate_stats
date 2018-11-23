import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import bearer from "./bearer";


export default combineReducers({
    router: routerReducer,
    bearer: bearer
})