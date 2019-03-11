import {
    ADD,
    API, CHANGE_OFFENSE, CLEAR_GAME,
    FAIL, FORCE_UPLOAD_GAME,
    GOAL, INJURY,
    LOAD_ALL_TEAMS,
    LOAD_GAME,
    LOAD_GAMES,
    LOAD_LOG,
    LOAD_PLAYERS,
    LOAD_ROSTERS, LOAD_SHOW_GAME,
    LOAD_TOURNAMENTS,
    LOAD_USERS,
    LOG_ACTION, LOGOUT, OTHER,
    PULL,
    PUSH_NEW_TEAM,
    PUSH_NEW_TOURNAMENT, REDO,
    SHOULD_RELOAD,
    SOTG,
    START,
    SUCCESS,
    TEAM_ONE,
    TEAM_TWO,
    THROW, TIME_PAUSE, TIME_START, TIME_STOP, TIMEOUT,
    TURNOVER, UNDEFINED_EVENT, UNDO,
    UPDATE_TIMER_GAME,
    UPDATE_TOURNAMENT,
    UPLOAD_GAME,
    UPLOAD_LOG, VIEW_LOAD_LOG,
    WRONG_USER
} from "./constants";
import {push} from 'react-router-redux';
import uuidv4 from 'uuid/v4';
import {LogLineData} from "./model";

export const loadDataForShowGame = (gameID) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_SHOW_GAME + START,
        });

        fetch(API.games + '/' + gameID)
            .then(res => {
                if (res.status >= 400) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
            .then(game => {
                dispatch({
                    type: LOAD_GAME + SUCCESS,
                    payload: game
                });

                return fetch(API.logs + '/' + game.logID);
            })
            .then(res => {
                if (res.status >= 400) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
            .then(log => {
                dispatch({
                    type: LOAD_LOG + SUCCESS,
                    payload: {response: log}
                });

                return fetch(API.all_teams);
            })
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
                console.error('Ошибка загрузки данных', error);
                dispatch({
                    type: LOAD_SHOW_GAME + FAIL,
                    payload: {error, id: gameID}
                });
            })

    }
};

export const logout = () => {
  return (dispatch) => {
      dispatch({
          type: LOGOUT
      });
  }
};

export const gameControl = (type, game, log, data) => {
    return (dispatch, getState) => {
        let logLine = {
            id: uuidv4(),
            type: type,
            team: game.offense,
            time: `${type === TIME_START || type === TIME_STOP ? game.timePassed + 1 : game.timePassed}`, // хак для правильной сортировки логов
            playerGoal: '',
            playerAssist: '',
            currScoreTeamOne: game.teamOneScore,
            currScoreTeamTwo: game.teamTwoScore,

        };

        if (!game.inProgress && type !== TIME_START && type !== UNDO && type !== CHANGE_OFFENSE) return;
        switch (type) {
            case TIME_START:
                dispatch({
                    type: LOG_ACTION + TIME_START,
                    payload: {game, logLine: LogLineData(logLine)}
                });
                break;

            case TIME_PAUSE:
                dispatch({
                    type: LOG_ACTION + TIME_PAUSE,
                    payload: {game, logLine: LogLineData(logLine)}
                });
                break;

            case TIME_STOP:
                dispatch({
                    type: LOG_ACTION + TIME_STOP,
                    payload: {game, logLine: LogLineData(logLine)}
                });
                break;

            case GOAL:
                logLine.team = game.offense;
                logLine.playerGoal = data.goal.id;
                logLine.playerAssist = data.assist.id;

                logLine.currScoreTeamOne = +game.teamOneScore + (game.offense === TEAM_ONE ? 1 : 0);
                logLine.currScoreTeamTwo = +game.teamTwoScore + (game.offense === TEAM_TWO ? 1 : 0);

                dispatch({
                    type: LOG_ACTION + GOAL,
                    payload: {game, logLine: LogLineData(logLine)}
                });
                break;

            case PULL:
                logLine.team = game.offense === TEAM_ONE ? TEAM_TWO : TEAM_ONE;

                dispatch({
                    type: LOG_ACTION + PULL,
                    payload: {game, logLine: LogLineData(logLine)}
                });
                break;

            case THROW:
                dispatch({
                    type: LOG_ACTION + THROW,
                    payload: {game, logLine: LogLineData(logLine)}
                });
                break;

            case TURNOVER:
                logLine.team = game.offense === TEAM_ONE ? TEAM_TWO : TEAM_ONE;

                dispatch({
                    type: LOG_ACTION + TURNOVER,
                    payload: {game, logLine: LogLineData(logLine)}
                });
                break;

            case TIMEOUT + TEAM_ONE:
            case TIMEOUT + TEAM_TWO:
                logLine.type = TIMEOUT;
                logLine.team = type.substr(TIMEOUT.length);

                dispatch({
                    type: LOG_ACTION + TIMEOUT,
                    payload: {game, logLine: LogLineData(logLine)}
                });
                break;

            case SOTG + TEAM_ONE:
            case SOTG + TEAM_TWO:
                logLine.team = type.substr(SOTG.length);
                logLine.type = SOTG;

                dispatch({
                    type: LOG_ACTION + SOTG,
                    payload: {game, logLine: LogLineData(logLine)}
                });
                break;

            case INJURY + TEAM_ONE:
            case INJURY + TEAM_TWO:
                logLine.team = type.substr(INJURY.length);
                logLine.type = INJURY;

                dispatch({
                    type: LOG_ACTION + INJURY,
                    payload: {game, logLine: LogLineData(logLine)}
                });
                break;

            case OTHER + TEAM_ONE:
            case OTHER + TEAM_TWO:
                logLine.team = type.substr(OTHER.length);
                logLine.type = OTHER;
                dispatch({
                    type: LOG_ACTION + OTHER,
                    payload: {game, logLine: LogLineData(logLine)}
                });
                break;

            case UNDO:
                const lastLogLine = getState().logs.list.get(game.logID).logList[getState().logs.list.get(game.logID).logList.length - 1];

                dispatch({
                    type: UNDO + ADD,
                    payload: {game, logLine: lastLogLine}
                });
                break;

            case REDO:
                const redoLogLine = getState().undoList.list.last();
                const redoType = redoLogLine.type;
                logLine = redoLogLine.toObject();

                dispatch({
                    type: LOG_ACTION + redoType,
                    payload: {game, logLine: LogLineData(redoLogLine)}
                });

                dispatch({
                    type: REDO,
                    payload: {game}
                });
                break;
            case FORCE_UPLOAD_GAME:
                break;
            case CHANGE_OFFENSE:
                dispatch({
                    type: CHANGE_OFFENSE,
                    payload: {game}
                });

                break;
            default:
                dispatch({
                    type: LOG_ACTION + UNDEFINED_EVENT,
                    payload: {game, logLine: LogLineData(logLine)}
                });
        }

        if (type !== UNDO && type !== REDO && type !== FORCE_UPLOAD_GAME && type !== CHANGE_OFFENSE) {
            dispatch({
                type: LOG_ACTION,
                payload: {game, logLine: LogLineData(logLine)}
            });
        }

        if (type === REDO) {
            dispatch({
                type: LOG_ACTION,
                payload: {game, logLine: LogLineData(logLine), isRedo: true}
            });
        }

        game && dispatch(updateGame(getState().games.list.get(game.id)));
        (log || type === TIME_START || type === TIME_STOP || type === TIME_PAUSE)
            && dispatch(updateLog(getState().logs.list.get(game.logID)));

        // dispatch({
        //     type: UPLOAD_GAME + SHOULD_UPLOAD,
        //     payload: {id: game.id},
        // });
        //
        // dispatch({
        //     type: UPLOAD_LOG + SHOULD_UPLOAD,
        //     payload: {id: game.logID},
        // });
    }
};

export const clearGame = (game) => {
  return (dispatch) => {
      dispatch({
          type: CLEAR_GAME,
          payload: {game}
      });

  }
};

export const updateGame = (game) => {
   return (dispatch) => {
        dispatch({
            type: UPLOAD_GAME + START,
            payload: {id: game.id},
        });

        const params = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        };

        // const path = `${API.games}/${game.id}`;
        // console.log('-----path', API.games);
       // console.log('-----params.body', params.body);
       //
       // debugger

        fetch(API.games, params)
            .then((resp) => {
                if ((resp.status < 200) || (resp.status > 300)) {
                    throw new Error("Response status: " + resp.status);
                } else return resp;
            })
            .then(() => {
                dispatch({
                    type: UPLOAD_GAME + SUCCESS,
                    payload: {id: game.id},
                });
                // dispatch({
                //     type: LOAD_GAMES + SHOULD_RELOAD,
                // });

            })
            .catch((err) => {
                // dispatch({
                //     type: UPLOAD_GAME + FAIL,
                //     payload: {id: game.id, error: err},
                // });
                console.error(`Не получилось обновить таблицу игры! ID игры: ${game.id}`, err);
            })

    }
};

//////// Testing purpose
// export const gameShouldUpload = (game) => {
//     return (dispatch) => {
//         dispatch({
//             type: UPLOAD_GAME + SHOULD_UPLOAD,
//             payload: {id: game.id},
//         })
//     }
// };

export const updateLog = (log) => {
    return (dispatch) => {
        dispatch({
            type: UPLOAD_LOG + START,
            payload: {id: log.id},
        });

        const uploadData = {
            id: log.id,
            list: [...log.logList]
        };

        const params = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(uploadData)
        };

        // const path = `${API.logs}/${log.id}`;
        // console.log('-----path', API.logs);
        // console.log('-----params.body', params.body);
        // debugger

        fetch(API.logs, params)
            .then((resp) => {
                if ((resp.status < 200) || (resp.status > 300)) {
                    throw new Error("Response status: " + resp.status);
                } else return resp;
            })
            .then(() => {
                dispatch({
                    type: UPLOAD_LOG + SUCCESS,
                    payload: {id: log.id},
                });

            })
            .catch((err) => {
                // dispatch({
                //     type: UPLOAD_LOG + FAIL,
                //     payload: err,
                // });
                console.error(`Не получилось обновить таблицу лога! ID игры: ${log.id}`, err);
            })

    }
};

export const loadLog = (logID) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_LOG + START,
            payload: {id: logID}
        });

        fetch(API.logs + '/' + logID)
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
                window.alert(`Файл лога для данной игры не найден на сервере! ID лога: ${logID}`);
                console.error('Ошибка загрузки лога', error);
                dispatch({
                    type: LOAD_LOG + FAIL,
                    payload: {error, id: logID}
                });
            });
    }
};

export const loadViewLog = (logID) => {
    return (dispatch) => {
        dispatch({
            type: VIEW_LOAD_LOG + START,
            payload: {id: logID}
        });

        fetch(API.logs + '/' + logID)
            .then(res => {
                if (res.status >= 400) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
            .then(response => dispatch({
                    type: VIEW_LOAD_LOG + SUCCESS,
                    payload: response
                })
            )
            .catch(error => {
                window.alert(`Файл лога для данной игры не найден на сервере! ID лога: ${logID}`);
                console.error('Ошибка загрузки лога', error);
                dispatch({
                    type: VIEW_LOAD_LOG + FAIL,
                    payload: {error, id: logID}
                });
            });
    }
};


export const loadRosters = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_ROSTERS + START
        });

        fetch(API.rosters)
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
            .catch(err => {
                dispatch({
                    type: LOAD_ROSTERS + FAIL,
                    payload: {err}
                });
                console.error('Ошибка загрузки ростеров!', err);

            });
    }
};

export const loadPlayers = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_PLAYERS + START
        });

        fetch(API.players)
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
            .catch(err => {
                dispatch({
                    type: LOAD_PLAYERS + FAIL,
                    payload: {err}
                });
                console.error('Ошибка загрузки данных игроков', err);

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

////////////// Testing purpose!
// export const updateGameStart = (gameID, data) => {
//     const {isTimerOn, inProgress} = data;
//
//     return (dispatch) => {
//         let payloadData = {};
//
//         if (isTimerOn && !inProgress) {
//             payloadData = {
//                 inProgress: true,
//                 isPull: true
//             }
//         }
//
//         dispatch({
//             type: UPDATE_GAME + GAME_START,
//             payload: {gameID, ...payloadData},
//         })
//     }
// };

export const updateTournament = (newTournamentData) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_TOURNAMENT + START,
        });

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
            .then(() => {
                dispatch({
                    type: UPDATE_TOURNAMENT + SUCCESS,
                });
                dispatch({
                    type: LOAD_TOURNAMENTS + SHOULD_RELOAD,
                });

            })
            .catch(() => {
                alert("Не получилось обновить таблицу турниров!");
            })

    }
};

export const pushNewTeam = (team) => {
    return (dispatch) => {
        dispatch({
            type: PUSH_NEW_TEAM + START,
        });

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
            .then(() => {
                dispatch({
                    type: PUSH_NEW_TEAM + SUCCESS,
                });
                dispatch({
                    type: LOAD_ALL_TEAMS + SHOULD_RELOAD,
                });

            })
            .catch((err) => {
                alert("Не получилось обновить таблицу команд!");
                console.error('Не получилось обновить таблицу команд!', err);
            })

    }
};

export const loadGames = (noToLoadGamesList) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_GAMES + START
        });

        fetch(API.games)
            .then(res => {
                if (res.status >= 400) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
            .then(response => {
                    let gamesToUpdate = response;

                    if (noToLoadGamesList && noToLoadGamesList.length !== 0) {
                        gamesToUpdate = response.filter(game => {
                            return noToLoadGamesList.find(el => el === game.id) === undefined;
                        });
                    }

                    gamesToUpdate.length !== 0 && gamesToUpdate.forEach(game => game.shouldSetTimer = true);
                    dispatch({
                        type: LOAD_GAMES + SUCCESS,
                        payload: gamesToUpdate
                    })
                }
            )
            .catch(err => {
                dispatch({
                    type: LOAD_GAMES + FAIL,
                    payload: {err}
                });
                console.error('Ошибка загрузки игр', err);
            });
    }
};

export const loadAllTeams = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_ALL_TEAMS + START
        });

        fetch(API.all_teams)
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
            .catch(err => {
                dispatch({
                    type: LOAD_ALL_TEAMS + FAIL,
                    payload: {err}
                });
                console.error('Ошибка загрузки информации о командах!', err);

            });
    }
};

export const pushNewTournament = (tournament) => {
    return (dispatch) => {
        dispatch({
            type: PUSH_NEW_TOURNAMENT + START,
        });

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
            .then(() => {
                dispatch({
                    type: PUSH_NEW_TOURNAMENT + SUCCESS,
                });
                dispatch({
                    type: LOAD_TOURNAMENTS + SHOULD_RELOAD,
                });

            })
            .catch((err) => {
                alert("Не получилось обновить таблицу турниров!");
                console.log('Ошибка обновления табоицы турниров!', err);
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
            .catch(err => {
                dispatch({
                    type: LOAD_TOURNAMENTS + FAIL,
                    payload: {err}
                });
                console.error('Ошибка загрузки списка турниров', err);
            });


    }
};

///////////////  immitation only!
// export const loadBearer = () => {
//     return (dispatch) => {
//         dispatch({
//             type: LOAD_BEARER + START,
//         });
//
//         fetch(API.bearer)
//             .then(res => {
//                 if (res.status >= 400) {
//                     throw new Error(res.statusText)
//                 }
//                 return res.json()
//             })
//             .then(response => dispatch({
//                     type: LOAD_BEARER + SUCCESS,
//                     payload: response
//                 })
//             )
//             .catch(err => {
//                 dispatch({
//                     type: LOAD_BEARER + FAIL,
//                     payload: {err}
//                 });
//                 console.error('Ошибка загрузки барьера', err);
//             });
//     }
// };

export const loadUsersAndLogin = (user) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_USERS + START,
        });

        const params = { method: 'GET',
            mode: 'cors',
            cache: 'default' };

        // const params = {};

        fetch(API.users, params)
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
            .catch(err => {
                dispatch({
                    type: LOAD_USERS + FAIL,
                    payload: {err}
                });
                console.error('Ошибка загрузки данных пользователя', err);
            });

    }
};

export const goTo = (path) => {
    return (dispatch) => {
        dispatch(push(path));
    }
};