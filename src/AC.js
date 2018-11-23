import {API, FAIL, LOAD_BEARER, SUCCESS} from "./constants";
import {push, replace} from 'react-router-redux';

export function loadBearer() {
    return (dispatch) => {
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