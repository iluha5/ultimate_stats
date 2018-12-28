// for API
export const START = '_START';
export const SUCCESS = '_SUCCESS';
export const FAIL = '_FAIL';
export const LOADING = '_LOADING';
export const LOADED = '_LOADED';

export const API = {
    bearer: '/bearer',
    users: '/users',
    tournaments: '/tournaments',
    all_teams: '/teams',
    games: '/games',
    rosters: '/rosters',
    players: '/players',
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
export const UPLOAD_GAME = 'UPLOAD_GAME';
export const GAME = 'GAME';
export const UPDATE_TOURNAMENT = 'UPDATE_TOURNAMENT';
export const LOAD_LOG_LIST = 'LOAD_LOG_LIST';
export const LOAD_LOG = 'LOAD_LOG';
export const UPLOAD_LOG = 'UPLOAD_LOG';

export const UPDATE_TIMER_GAME = 'UPDATE_TIMER_GAME';
export const UPDATE_GAME = 'UPDATE_GAME';
export const GAME_START = 'GAME_START';

// statuses
export const WRONG_USER = 'WRONG_USER';

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
export const PLAYER_CLICK = 'PLAYER_CLICK';

export const UNDEFINED_PLAYER = 'UNDEFINED_PLAYER';
export const UNDEFINED_EVENT = 'UNDEFINED_EVENT';

// Uploading statuses
export const STANDBY = 'STANDBY';
export const SHOULD_UPLOAD = 'SHOULD_UPLOAD';
export const NOW_UPLOADING = 'NOW_UPLOADING';
export const UPLOAD_INTERVAL = 2000;


