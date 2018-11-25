import {API, FAIL, LOAD_BEARER, LOAD_TOURNAMENTS, LOAD_USERS, START, SUCCESS, WRONG_USER} from "./constants";
import {push, replace} from 'react-router-redux';

export const loadTournamentsList = () => {
  return (dispatch) => {
      dispatch({
          type: LOAD_TOURNAMENTS + START,
      });

      fetch(API.tournaments)
          .then(res => {
              if (res.status >= 400) {
                  throw new Error(res.statusText)
              }
              return res.json()
          })
          .then(response => dispatch({
                  type: LOAD_TOURNAMENTS + SUCCESS,
                  payload: response
              })
          )
          .catch(error => {
              dispatch({
                  type: LOAD_TOURNAMENTS + FAIL,
                  payload: {error}
              });
              // dispatch(replace('/error'))
          });


  }
};

export const loadBearer = () => {
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
                // dispatch(replace('/error'))
            });
    }
};

export const loadUsersAndLogin = (user) => {
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
            .then(response => {
                    let fullUser;

                    if (Array.isArray(response)) {
                        fullUser = response.find(el => {
                            return el.password === user.password && el.email === user.email;
                        });

                        if (!fullUser) {
                            fullUser = {role: WRONG_USER};
                        }
                    }

                    fullUser.password && delete fullUser.password;

                    dispatch({
                        type: LOAD_USERS + SUCCESS,
                        payload: {fullUser}
                    });

                    if (fullUser.role !== WRONG_USER) {
                        dispatch(push('/network/keeper'));
                    }
                }
            )
            .catch(error => {
                dispatch({
                    type: LOAD_USERS + FAIL,
                    payload: {error}
                });
                // dispatch(replace('/error'))
            });

    }
};

export const goTo = (path) => {
    return (dispatch) => {
        dispatch(push(path));
    }
};