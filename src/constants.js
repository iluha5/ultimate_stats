// for API
export const START = '_START';
export const SUCCESS = '_SUCCESS';
export const FAIL = '_FAIL';
export const LOADING = '_LOADING';
export const LOADED = '_LOADED';
export const ADD = '_ADD';

export const API = {
    bearer: '/bearer',
    //users: 'http://142.93.129.161:8084/api/v1/users',
    users: '/users',
    //tournaments: 'http://142.93.129.161:8084/api/v1/tournaments',
    tournaments: '/tournaments',
    //all_teams: 'http://142.93.129.161:8084/api/v1/teams',
    all_teams: '/teams',
    //games: 'http://142.93.129.161:8084/api/v1/games/',
    games: '/games',
    //rosters: 'http://142.93.129.161:8084/api/v1/rosters',
    rosters: '/rosters',
    //players: 'http://142.93.129.161:8084/api/v1/players',
    players: '/players',
    //logs: 'http://142.93.129.161:8084/api/v1/logs/',
    logs: '/logs',
};

// commands
export const LOAD_BEARER = 'LOAD_BEARER';
export const LOAD_USERS = 'LOAD_USERS';
export const LOAD_TEAMS = 'LOAD_TEAMS';
export const LOAD_ROSTERS = 'LOAD_ROSTERS';
export const LOAD_PLAYERS = 'LOAD_PLAYERS';
export const LOAD_TOURNAMENTS = 'LOAD_TOURNAMENTS';
export const PUSH_NEW_TOURNAMENT = 'PUSH_NEW_TOURNAMENT';
export const PUSH_NEW_TEAM = 'PUSH_NEW_TEAM';
export const SHOULD_RELOAD = 'SHOULD_RELOAD';
export const LOAD_ALL_TEAMS = 'LOAD_ALL_TEAMS';
export const LOAD_GAMES = 'LOAD_GAMES';
export const LOAD_GAME = 'LOAD_GAME';
export const UPLOAD_GAME = 'UPLOAD_GAME';
export const GAME = 'GAME';
export const UPDATE_TOURNAMENT = 'UPDATE_TOURNAMENT';
export const LOAD_LOG_LIST = 'LOAD_LOG_LIST';
export const LOAD_LOG = 'LOAD_LOG';
export const VIEW_LOAD_LOG = 'VIEW_LOAD_LOG';
export const LOAD_SHOW_GAME = 'LOAD_SHOW_GAME';
export const UPLOAD_LOG = 'UPLOAD_LOG';

// Force commands
export const FORCE_UPLOAD_GAME = 'FORCE_UPLOAD_GAME';
export const CLEAR_GAME = 'CLEAR_GAME';

export const UPDATE_TIMER_GAME = 'UPDATE_TIMER_GAME';
export const UPDATE_GAME = 'UPDATE_GAME';
export const GAME_START = 'GAME_START';

// statuses
export const WRONG_USER = 'WRONG_USER';
export const LOGOUT = 'LOGOUT';

// roles
export const SCOREKEEPER = 'scorekeeper';
export const ADMIN = 'admin';

// view
export const DRAWER_WIDTH = 240;

// DB
export const TEAM_ONE = 'TEAM_ONE';
export const TEAM_TWO = 'TEAM_TWO';

//Log
export const LOG_ACTION = 'LOG_ACTION';
export const GOAL = 'GOAL';
export const TURNOVER = 'TURNOVER';
export const PULL = 'PULL';
export const THROW = 'THROW';
export const TIMEOUT = 'TIMEOUT';
export const SOTG = 'SOTG';
export const INJURY = 'INJURY';
export const OTHER = 'OTHER';
export const TIME_STOP = 'TIME_STOP';
export const TIME_START = 'TIME_START';
export const TIME_PAUSE = 'TIME_PAUSE';
export const CHANGE_OFFENSE = 'CHANGE_OFFENSE';
export const PLAYER_CLICK = 'PLAYER_CLICK';

export const UNDEFINED_PLAYER = 'UNDEFINED_PLAYER';
export const UNDEFINED_EVENT = 'UNDEFINED_EVENT';

export const UNDO = 'UNDO';
export const REDO = 'REDO';

// Uploading statuses
export const STANDBY = 'STANDBY';
export const SHOULD_UPLOAD = 'SHOULD_UPLOAD';
export const NOW_UPLOADING = 'NOW_UPLOADING';
export const UPLOAD_INTERVAL = 2000;


