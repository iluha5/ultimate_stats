import {OrderedMap, Record} from 'immutable';
import {convertPlainObjectToState} from "./helpers";
import {
    GameData,
    GamesState,
    TeamData,
    TeamsState,
    TournamentData,
    TournamentsListState,
    UserData,
    UserState
} from "./model";
// import {Record} from "immutable";

export const loadState = (data) => {

    // const {
    //     Record,
    //     convertPlainObjectToState,
    //     GameData,
    //     GamesState,
    //     TeamData,
    //     TeamsState,
    //     TournamentData,
    //     TournamentsListState,
    //     UserData,
    //     UserState,
    //     OrderedMap
    // } = data;
    // debugger
  try {
      const serializedState = localStorage.getItem('state');

      if (serializedState === null) {
          return undefined;
      }

      let loadedState = JSON.parse(serializedState);
      let { tournamentsList, user, games, teams } = loadedState;
      const defaultTournamentList = TournamentsListState();
      const defaultUser = UserState();
      const defaultGame = GamesState();
      const defaultTeams = TeamsState();
// debugger
      if (tournamentsList && tournamentsList.list && !Record.isRecord(tournamentsList)) {
          tournamentsList = convertPlainObjectToState(tournamentsList, TournamentData, defaultTournamentList, TournamentsListState, OrderedMap);
          loadedState = {...loadedState, tournamentsList};
      }
// debugger
      if (user && user.userData && !Record.isRecord(user)) {
          user = convertPlainObjectToState(user, UserData, defaultUser, UserState, OrderedMap, 'userData');
          loadedState = {...loadedState, user};
      }
// debugger
      if (games && games.list && !Record.isRecord(games)) {
          games = convertPlainObjectToState(games, GameData, defaultGame, GamesState, OrderedMap);
          loadedState = {...loadedState, games};
      }
// debugger
      if (teams && teams.list && !Record.isRecord(teams)) {
          teams = convertPlainObjectToState(teams, TeamData, defaultTeams, TeamsState, OrderedMap);
          loadedState = {...loadedState, teams};
      }

      console.log('-----localstorage, все ок', loadedState);
      // debugger
      return loadedState;
  }  catch (err) {
        console.error('----- localstorage', err);
        return undefined;
  }
};

export const saveState = (state) => {
   // console.log('----- saveState', state.toJS());
  try {
      const serializedState = JSON.stringify(state);
      // console.log('----- saveState, serializedState', serializedState);
      // const test = localStorage.getItem('state');
      // console.log('-----localstorage', test);

      localStorage.setItem('state', serializedState);
      // debugger
  } catch (err) {
      // console.log('----- saveStateError', state);

  }
};