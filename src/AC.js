import {
    API,
    FAIL, LOAD_ALL_TEAMS,
    LOAD_BEARER, LOAD_GAMES, LOAD_LOG, LOAD_LOG_LIST, LOAD_PLAYERS, LOAD_ROSTERS,
    LOAD_TEAMS, LOAD_TOURNAMENTS,
    LOAD_USERS, PUSH_NEW_TEAM,
    PUSH_NEW_TOURNAMENT, SHOULD_RELOAD, SHOULD_UPLOAD,
    START,
    SUCCESS, UPDATE_TIMER_GAME, UPDATE_TOURNAMENT, UPLOAD_GAME,
    WRONG_USER
} from "./constants";
import {push, replace} from 'react-router-redux';
import uuidv4 from 'uuid/v4';

// export const loadAllLogs = () => {
//     return (dispatch) => {
//         dispatch({
//             type: LOAD_LOG_LIST + START
//         });
//
//         fetch (API.logs)
//             .then(res => {
//                 if (res.status >= 400) {
//                     throw new Error(res.statusText)
//                 }
//                 return res.json()
//             })
//             .then(response => dispatch({
//                     type: LOAD_LOG_LIST + SUCCESS,
//                     payload: response
//                 })
//             )
//             .catch(error => {
//                 dispatch({
//                     type: LOAD_LOG_LIST + FAIL,
//                     payload: {error}
//                 });
//             });
//     }
// };

export const updateGame = (game) => {
    return (dispatch) => {
        dispatch({
            type: UPLOAD_GAME + START,
            payload: {id: game.id},
        });

        // debugger
        const params = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        };

        const path = `${API.games}/${game.id}`;

        fetch(path, params)
            .then((resp) => {
                if ((resp.status < 200) || (resp.status > 300)) {
                    throw new Error("Response status: " + resp.status);
                } else return resp;
            })
            .then((res) => {
                dispatch({
                    type: UPLOAD_GAME + SUCCESS,
                    payload: {id: game.id},
                });
                dispatch({
                    type: LOAD_GAMES + SHOULD_RELOAD,
                });

            })
            .catch((err) => {
                dispatch({
                    type: UPLOAD_GAME + FAIL,
                    payload: err,
                });

                // alert("Не получилось обновить таблицу турниров!");
            })

    }
};

export const gameShouldUpload = (game) => {
    return (dispatch) => {
        dispatch({
            type: UPLOAD_GAME + SHOULD_UPLOAD,
            payload: {game},
        })
    }
};


export const loadLog = (logID) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_LOG + START,
            payload: {id: logID}
        });

        fetch (API.logs + '/' + logID)
            .then(res => {
                if (res.status >= 400) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
            .then(response => dispatch({
                    type: LOAD_LOG + SUCCESS,
                    payload: response
                })
            )
            .catch(error => {
                dispatch({
                    type: LOAD_LOG + FAIL,
                    payload: {error}
                });
            });
    }
};


export const loadRosters = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_ROSTERS + START
        });

        fetch (API.rosters)
            .then(res => {
                if (res.status >= 400) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
            .then(response => dispatch({
                    type: LOAD_ROSTERS + SUCCESS,
                    payload: response
                })
            )
            .catch(error => {
                dispatch({
                    type: LOAD_ROSTERS + FAIL,
                    payload: {error}
                });
            });
    }
};

export const loadPlayers = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_PLAYERS + START
        });

        fetch (API.players)
            .then(res => {
                if (res.status >= 400) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
            .then(response => dispatch({
                    type: LOAD_PLAYERS + SUCCESS,
                    payload: response
                })
            )
            .catch(error => {
                dispatch({
                    type: LOAD_PLAYERS + FAIL,
                    payload: {error}
                });
            });
    }
};


export const updateGameTimer = (gameID, time) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_TIMER_GAME,
            payload: {gameID, time},
        })
    }
};

export const updateTournament = (newTournamentData) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_TOURNAMENT + START,
        });

        // debugger
        const params = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTournamentData)
        };

        const path = `${API.tournaments}/${newTournamentData.id}`;

        fetch(path, params)
            .then((resp) => {
                if ((resp.status < 200) || (resp.status > 300)) {
                    throw new Error("Response status: " + resp.status);
                } else return resp;
            })
            .then((res) => {
                dispatch({
                    type: UPDATE_TOURNAMENT + SUCCESS,
                });
                dispatch({
                    type: LOAD_TOURNAMENTS + SHOULD_RELOAD,
                });

            })
            .catch((err) => {
                alert("Не получилось обновить таблицу турниров!");
            })

    }

};

export const pushNewTeam = (team) => {
    return (dispatch) => {
        dispatch({
            type: PUSH_NEW_TEAM + START,
        });

        // debugger
        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(team)
        };

        fetch(API.all_teams, params)
            .then((resp) => {
                if ((resp.status < 200) || (resp.status > 300)) {
                    throw new Error("Response status: " + resp.status);
                } else return resp;
            })
            .then((res) => {
                console.log('-----res', res);
                dispatch({
                    type: PUSH_NEW_TEAM + SUCCESS,
                });
                dispatch({
                    type: LOAD_ALL_TEAMS + SHOULD_RELOAD,
                });

            })
            .catch((err) => {
                alert("Не получилось обновить таблицу команд!");
            })

    }
};


export const loadGames = () => {
    // debugger
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
                    type: LOAD_TOURNAMENTS + SHOULD_RELOAD,
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