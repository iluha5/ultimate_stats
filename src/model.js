import {OrderedMap, Record, Map} from "immutable";
import {TEAM_ONE} from "./constants";

export const TournamentData = Record({
    id: '',
    name: '',
    country: '',
    place: '',
    dateStart: '',
    dateEnd: '',
    covering: '',
    format: '',
    games: null,
    teams: null,
    teamsList: [],
    isMenDivision: false,
    isWomenDivision: false,
    isMixDivision: false,
    ownerId: ''
});

export const TournamentsListState = Record({
    isLoading: false,
    shouldReload: true,
    list: new OrderedMap({})
});

export const TeamData = Record({
    id: '',
    name: '',
    players: '',
    games: '',
    rosterID: '',
});

export const TeamsState = Record({
    isLoading: false,
    shouldReload: true,
    list: new OrderedMap({})
});

export const UserData = Record({
    id: null,
    name: null,
    email: null,
    role: null,
    isAuthenticated: false,
});

export const UserState = Record({
    isLoading: false,
    userData: {}
});

export const GameData = Record({
    id: '',
    tournamentID: '',
    logID: '',
    ownerID: '',
    teamOneID: '',
    teamTwoID: '',
    inProgress: false,
    isFinished: false,
    offense: TEAM_ONE,
    win: -1,
    teamOneScore: 0,
    teamTwoScore: 0,
    codeOne: '',
    codeTwo: '',
    teamOneTurnovers: 0,
    teamTwoTurnovers: 0,
    fullTimeDuration: 0,
    teamOneOffenceDuration: 0,
    teamTwoOffenceDuration: 0,
    SotgTeamOne: [-1],
    SotgTeamTwo: [-1],
    SotgCommentsTeamOne: '',
    SotgCommentsTeamTwo: '',
    passesTeamOne: 0,
    passesTeamTwo: 0,
    takenTimeOutsTeamOne: [],
    takenTimeOutsTeamTwo: [],
    takenSotgTimeOutsTeamOne: [],
    takenSotgTimeOutsTeamTwo: [],
    injuryStoppageTeamOne: 0,
    injuryStoppageTeamTwo: 0,
    otherCallsTeamOne: 0,
    otherCallsTeamTwo: 0,
    others: [],
    shouldUpload: false,
    shouldReload: false,
    shouldSetTimer: false,
    isUploading: false,
    date: '',
    timeStart: '',
    timePassed: 0,
    statisticID: '',
    rosterID: '', // не нужно???
    isPull: true, // должно быть false по умолчанию??
    isTimeOn: false,
});

export const GamesState = Record({
    isLoading: false,
    shouldUpload: false,
    shouldReload: true,
    list: new OrderedMap({})
});

export const PlayerData = Record({
    id: '',
    firstName: '',
    secondName: '',
    patronymic: '',
    dateOfBirth: '',
    g175: '',
    vk: '',
    fb: '',
    email: '',
    avatar: '',
    isCaptian: false,
    isCoach: false,
    isSotgCaptain: false,
    description: ''
});
export const PlayersState = Record({
    isLoading: false,
    shouldUpload: false,
    shouldReload: true,
    list: new OrderedMap({})
});

export const RosterData = Record({
    id: '',
    players: new Map({})
});
export const RostersState = Record({
    isLoading: false,
    shouldUpload: false,
    shouldReload: true,
    list: new OrderedMap({})
});

export const LogsState = Record({
    // isLoading: false,
    // shouldUpload: false,
    // shouldReload: true,
    list: Map({})
});
export const LogData = Record({
    id: '',
    isLoading: false,
    shouldUpload: false,
    shouldReload: true,
    isUploading: false,
    isError: false,
    logList: [],
});
export const LogLineData = Record({
    id: '',
    type: '',
    team: '',
    time: 0,
    playerGoal: '',
    playerAssist: '',
    currScoreTeamOne: 0,
    currScoreTeamTwo: 0,
    gameSnapshot: {}
});

export const ViewLogsState = Record({
    list: Map({})
});
export const ViewLogData = Record({
    id: '',
    isLoading: false,
    shouldUpload: false,
    shouldReload: true,
    isUploading: false,
    isError: false,
    logList: [],
});
export const ViewLogLineData = Record({
    id: '',
    type: '',
    team: '',
    time: 0,
    playerGoal: '',
    playerAssist: '',
    currScoreTeamOne: 0,
    currScoreTeamTwo: 0,
    gameSnapshot: {}
});

export const LogUndoState = Record({
    gameID: '',
    isEmpty: true,
    list: OrderedMap({}),
});

export const PlayerScoreData = Record({
    id: '',
    playerID: '',
    goals: 0,
    assists: 0,
    callahans: 0
});
export const GameStatisticData = Record({
    id: '',
    scoreList: new Map({}),
});
export const GamesStatisticsState = Record({
    isLoading: false,
    shouldUpload: false,
    shouldReload: true,
    list: new OrderedMap({})
});

