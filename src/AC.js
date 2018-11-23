import {API, FAIL, LOAD_BEARER, LOAD_USERS, START, SUCCESS} from "./constants";
import {push, replace} from 'react-router-redux';

export function loadBearer() {
    return (dispatch) => {
        dispatch({
            type: LOAD_BEARER + START,
        });

        fetch(API.bearer)
            .then(res => {
                if (res.status >= 400) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
            .then(response => dispatch({
                    type: LOAD_BEARER + SUCCESS,
                    payload: response
                })
            )
            .catch(error => {
                dispatch({
                    type: LOAD_BEARER + FAIL,
                    payload: {error}
                });
                dispatch(replace('/error'))
            });
    }
}

export function loadUsersAndLogin(user) {
    return (dispatch) => {
        dispatch({
            type: LOAD_USERS + START,
        });
// debugger;
        fetch(API.users)
            .then(res => {
                if (res.status >= 400) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
            .then(response => dispatch({
                    type: LOAD_USERS + SUCCESS,
                    payload: { response, user }
                })
            )
            .catch(error => {
                dispatch({
                    type: LOAD_USERS + FAIL,
                    payload: {error}
                });
                // dispatch(replace('/error'))
            });

    }
}