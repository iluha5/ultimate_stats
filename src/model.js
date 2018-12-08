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
    role: null
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
    teamOneScore: '',
    teamTwoScore: '',
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
    date: '',
    timeStart: '',
    timePassed: 0,
    statisticID: '',
    rosterID: ''
});

export const GamesState = Record({
    isLoading: false,
    shouldUpload: false,
    shouldReload: true,
    list: new OrderedMap({})
});


///////// new
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
