import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {routerMiddleware} from 'react-router-redux';
import history from './history';
import reducer from './Reducers'


const enhancer = applyMiddleware(thunk, routerMiddleware(history));

const store = createStore(reducer, enhancer);

//dev only
window.store = store;

export default store;