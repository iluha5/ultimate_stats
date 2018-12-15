// for API
export const START = 'START';
export const SUCCESS = 'SUCCESS';
export const FAIL = 'FAIL';
export const LOADING = 'LOADING';
export const LOADED = 'LOADED';

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
export const UPDATE_TOURNAMENT = 'UPDATE_TOURNAMENT';
export const UPDATE_TIMER_GAME = 'UPDATE_TIMER_GAME';
export const LOAD_LOG_LIST = 'LOAD_LOG_LIST';
export const LOAD_LOG = 'LOAD_LOG';

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
export const GOAL = 'GOAL';
export const TURNOVER = 'TURNOVER';
export const THROW = 'THROW';
export const TIMEOUT = 'TIMEOUT';
export const SOTG = 'SOTG';
export const INJURY = 'INJURY';
export const OTHER = 'OTHER';
export const TIME_STOP = 'TIME_STOP';
export const TIME_START = 'TIME_START';
export const TIME_PAUSE = 'TIME_PAUSE';

export const UNDEFINED_PLAYER = 'UNDEFINED_PLAYER';
