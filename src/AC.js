import {
    API,
    FAIL, LOAD_ALL_TEAMS,
    LOAD_BEARER, LOAD_GAMES,
    LOAD_TEAMS,
    LOAD_USERS,
    PUSH_NEW_TOURNAMENT, SHOULD_RELOAD,
    START,
    SUCCESS,
    WRONG_USER
} from "./constants";
import {push, replace} from 'react-router-redux';


export const loadGames = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_GAMES + START
        });

        fetch (API.games)
            .then(res => {
                if (res.status >= 400) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
            .then(response => dispatch({
                    type: LOAD_GAMES + SUCCESS,
                    payload: response
                })
            )
            .catch(error => {
                dispatch({
                    type: LOAD_GAMES + FAIL,
                    payload: {error}
                });
            });
    }
};


export const loadAllTeams = () => {
  return (dispatch) => {
      dispatch({
          type: LOAD_ALL_TEAMS + START
      });

      fetch (API.all_teams)
          .then(res => {
              if (res.status >= 400) {
                  throw new Error(res.statusText)
              }
              return res.json()
          })
          .then(response => dispatch({
                  type: LOAD_ALL_TEAMS + SUCCESS,
                  payload: response
              })
          )
          .catch(error => {
              dispatch({
                  type: LOAD_ALL_TEAMS + FAIL,
                  payload: {error}
              });
          });
  }
};

export const pushNewTournament = (tournament) => {
    return (dispatch) => {
        dispatch({
           type: PUSH_NEW_TOURNAMENT + START,
        });

        // debugger
        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tournament)
        };

        fetch(API.tournaments, params)
            .then((resp) => {
                if ((resp.status < 200) || (resp.status > 300)) {
                    throw new Error("Response status: " + resp.status);
                } else return resp;
            })
            .then((res) => {
                dispatch({
                    type: PUSH_NEW_TOURNAMENT + SUCCESS,
                });
                dispatch({
                    type: LOAD_TEAMS + SHOULD_RELOAD,
                });

            })
            .catch((err) => {
                alert("Не получилось обновить таблицу турниров!");
            })

    }
};

export const loadTournamentsList = () => {
  return (dispatch) => {
      dispatch({
          type: LOAD_TEAMS + START,
      });

      fetch(API.tournaments)
          .then(res => {
              if (res.status >= 400) {
                  throw new Error(res.statusText)
              }
              return res.json()
          })
          .then(response => dispatch({
                  type: LOAD_TEAMS + SUCCESS,
                  payload: response
              })
          )
          .catch(error => {
              dispatch({
                  type: LOAD_TEAMS + FAIL,
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