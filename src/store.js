import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {routerMiddleware} from 'react-router-redux';
import history from './history';
import reducer from './Reducers'
import {loadState, saveState} from "./localstorage";
import throttle from "lodash/throttle";


const persistedStore = loadState();

const enhancer = applyMiddleware(thunk, routerMiddleware(history));
const store = createStore(reducer, persistedStore, enhancer);

store.subscribe(throttle(() => {
   saveState(store.getState());
}, 1000));

//dev only
window.store = store;

export default store;