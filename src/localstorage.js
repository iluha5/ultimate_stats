import {Record} from 'immutable';
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

export const loadState = () => {
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

      if (tournamentsList && tournamentsList.list && !Record.isRecord(tournamentsList)) {
          tournamentsList = convertPlainObjectToState(tournamentsList, TournamentData, defaultTournamentList);
          loadedState = {...loadedState, tournamentsList};
      }

      if (user && user.userData && !Record.isRecord(user)) {
          user = convertPlainObjectToState(user, UserData, defaultUser, 'userData');
          loadedState = {...loadedState, user};
      }

      if (games && games.list && !Record.isRecord(games)) {
          games = convertPlainObjectToState(games, GameData, defaultGame);
          loadedState = {...loadedState, games};
      }

      if (teams && teams.list && !Record.isRecord(teams)) {
          teams = convertPlainObjectToState(teams, TeamData, defaultTeams);
          loadedState = {...loadedState, teams};
      }

      // console.log('-----loadedState', loadedState);
      // debugger
      return loadedState;
  }  catch (err) {
        return undefined;
  }
};

export const saveState = (state) => {
   // console.log('----- saveState', state.toJS());
  try {
      const serializedState = JSON.stringify(state);
      // console.log('----- saveState, serializedState', serializedState);
      const test = localStorage.getItem('state');
      console.log('-----localstorage', test);

      localStorage.setItem('state', serializedState);
      // debugger
  } catch (err) {
      // console.log('----- saveStateError', state);

  }
};