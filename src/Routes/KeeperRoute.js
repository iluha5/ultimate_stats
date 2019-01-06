import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Scorekeeper from "../Components/Scorekeeper";
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {ADMIN, SCOREKEEPER} from "../constants";
import Tournament from "../Components/Tournament";
import Game from "../Components/Game";

class KeeperRoute extends Component {

    renderTournament = ({match}) => {
        const {tournamentID} = match.params;
        const {user} = this.props;

        return (user && (user.role === SCOREKEEPER || user.role === ADMIN )) ? (
            <Tournament id={tournamentID}/>
        ) : (
            <Redirect to='/network' />
        )
    };

    renderGame = ({match}) => {
        const {id, tournamentID} = match.params;
        const {user} = this.props;

        return (user && (user.role === SCOREKEEPER || user.role === ADMIN )) ? (
            <Game id={id} tournamentID={tournamentID} />
        ) : (
            <Redirect to='/network' />
        )
    };

    render() {
        return (
            <div>
                <Switch>
                    <Route path='/network/keeper/tournament/:tournamentID/game/:id' render={this.renderGame}/>
                    <Route path='/network/keeper/tournament/:tournamentID' render={this.renderTournament}/>
                    <Redirect path='/network/keeper/tournament' exact to='/network/keeper/'  />
                    <Route path='/network/keeper' exact component={Scorekeeper} />
                    <Redirect path='/network/keeper/:any' to='/network/keeper/'  />
                </Switch>

            </div>
        );
    }
}

KeeperRoute.propTypes = {
    // from store
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.user.userData
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(KeeperRoute);