import {OrderedMap, Record} from 'immutable';
import {convertLogToRecord, convertPlainObjectToState} from "./helpers";
import {
    GameData,
    GamesState,
    TeamData,
    TeamsState,
    TournamentData,
    TournamentsListState,
    UserData,
    UserState,
    RosterData,
    RostersState,
    PlayerData,
    PlayersState, LogData, LogsState, LogLineData, LogUndoState, ViewLogsState
} from "./model";

export const loadState = () => {

  try {
      const serializedState = localStorage.getItem('state');

      if (serializedState === null) {
          return undefined;
      }

      let loadedState = JSON.parse(serializedState);
      let { tournamentsList, user, games, teams, rosters, players, logs} = loadedState;
      const defaultTournamentList = TournamentsListState();
      const defaultUser = UserState({userData: UserData()});
      const defaultGame = GamesState();
      const defaultTeams = TeamsState();
      const defaultRosters = RostersState();
      const defaultPlayers = PlayersState();
      const defaultLogs = LogsState();
      const defaultViewLogs = ViewLogsState();
      const defaultLogUndo = LogUndoState();

      if (tournamentsList && tournamentsList.list && !Record.isRecord(tournamentsList)) {
          tournamentsList = convertPlainObjectToState(tournamentsList, TournamentData, defaultTournamentList, TournamentsListState, OrderedMap);
          tournamentsList.set('isLoading', false);

          loadedState = {...loadedState, tournamentsList};
      }

      if (user && user.userData && !Record.isRecord(user)) {
          user = convertPlainObjectToState(user, UserData, defaultUser, UserState, OrderedMap, 'userData');

          user = user.set('isLoading', false);

          loadedState = {...loadedState, user};
      }
      // loadedState = {...loadedState, user: defaultUser};

      if (games && games.list && !Record.isRecord(games)) {
          games = convertPlainObjectToState(games, GameData, defaultGame, GamesState, OrderedMap);

          games = games.set('isLoading', false);

          loadedState = {...loadedState, games};
      }

      if (teams && teams.list && !Record.isRecord(teams)) {
          teams = convertPlainObjectToState(teams, TeamData, defaultTeams, TeamsState, OrderedMap);

          teams = teams.set('isLoading', false);

          loadedState = {...loadedState, teams};
      }

      if (rosters && rosters.list && !Record.isRecord(rosters)) {
          rosters = convertPlainObjectToState(rosters, RosterData, defaultRosters, RostersState, OrderedMap);

          rosters = rosters.set('isLoading', false);

          loadedState = {...loadedState, rosters};
      }

      if (players && players.list && !Record.isRecord(players)) {
          players = convertPlainObjectToState(players, PlayerData, defaultPlayers, PlayersState, OrderedMap);

          players = players.set('isLoading', false);

          loadedState = {...loadedState, players};
      }

      if (logs && logs.list && !Record.isRecord(logs)) {
          logs = convertLogToRecord(logs, LogData, LogLineData, LogsState, defaultLogs, OrderedMap, GameData);

          loadedState = {...loadedState, logs};
      }
// debugger
      loadedState = {...loadedState, undoList: defaultLogUndo, viewLogs: defaultViewLogs};

      // if (undoList && undoList.list && !Record.isRecord(undoList)) {
      //     // debugger
      //
      //     undoList = convertPlainObjectToState(undoList, LogLineData, defaultLogUndo, LogUndoState, OrderedMap);
      //
      //     loadedState = {...loadedState, undoList};
      // }

      // console.log('-----localstorage, все ок', loadedState);
      // debugger
      return loadedState;
  }  catch (err) {
        console.error('Ошибка при загрузки из Localstorage!', err);
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