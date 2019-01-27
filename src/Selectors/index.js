import {createSelector} from 'reselect';
import {TEAM_ONE, TEAM_TWO} from "../constants";

const teamOneIDGetter = (state, props) => props.teamOneID;
const teamTwoIDGetter = (state, props) => props.teamTwoID;
const logIDGetter = (state, props) => props.logID;
const teamsListGetter = (state) => state.teams.list;
const logsListGetter = (state) => state.logs.list;
const viewLogsListGetter = (state) => state.viewLogs.list;
const rostersListGetter = (state) => state.rosters.list;
const playersListGetter = (state) => state.players.list;


export const makeGetLogProps = () => createSelector(
    teamOneIDGetter, teamTwoIDGetter, logIDGetter, teamsListGetter,
    logsListGetter, rostersListGetter, playersListGetter,
    (teamOneID, teamTwoID, logID, teamsList, logsList, rostersList, playersList) => {
        const teamNames = {
            [TEAM_ONE]: teamsList.get(teamOneID).name,
            [TEAM_TWO]: teamsList.get(teamTwoID).name,
        };
        const log = !logsList.isEmpty() ? logsList.get(logID) : null;
        const rosterTeamOne = rostersList.get(teamsList.get(teamOneID).rosterID);
        const rosterTeamTwo = rostersList.get(teamsList.get(teamTwoID).rosterID);

        return {
            log: log,
            players: playersList,
            teams: teamsList,
            rosters: rostersList,
            rosterTeamOne: rosterTeamOne,
            rosterTeamTwo: rosterTeamTwo,
            teamNames: teamNames,
        };
    }
);

export const makeGetViewLogProps = () => createSelector(
    teamOneIDGetter, teamTwoIDGetter, logIDGetter, teamsListGetter,
    viewLogsListGetter, rostersListGetter, playersListGetter,
    (teamOneID, teamTwoID, logID, teamsList, logsList, rostersList, playersList) => {
        const teamNames = {
            [TEAM_ONE]: teamsList.get(teamOneID).name,
            [TEAM_TWO]: teamsList.get(teamTwoID).name,
        };
        const log = !logsList.isEmpty() ? logsList.get(logID) : null;
        const rosterTeamOne = rostersList.get(teamsList.get(teamOneID).rosterID);
        const rosterTeamTwo = rostersList.get(teamsList.get(teamTwoID).rosterID);

        return {
            log: log,
            players: playersList,
            teams: teamsList,
            rosters: rostersList,
            rosterTeamOne: rosterTeamOne,
            rosterTeamTwo: rosterTeamTwo,
            teamNames: teamNames,
        };
    }
);
