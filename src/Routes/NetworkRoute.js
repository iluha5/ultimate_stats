import React, {Component} from 'react';
import Login from "../Components/Login";
import Scorekeeper from "../Components/Scorekeeper";
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {ADMIN, SCOREKEEPER} from "../constants";
import GameViewLog from "../Components/GameViewLog";

class NetworkRoute extends Component {
    renderKeeper = () => {
        const {user} = this.props;

        return (user && (user.role === SCOREKEEPER || user.role === ADMIN)) ? (
            <Scorekeeper/>
        ) : (
            <Redirect to='/network'/>
        )
    };


    redirectNetwork = () => <Redirect to='/network'/>;

    renderShowGame = ({match}) => {
        const {id, tournamentID} = match.params;
        const {user} = this.props;

        // return (user && (user.role === SCOREKEEPER || user.role === ADMIN)) ? (
        //     <Game id={id} tournamentID={tournamentID}/>
        // ) : (
        //     <Redirect to='/network'/>
        // )

        return (
            <GameViewLog
                gameID={id}
                logID={null}
                teamOneID={null}
                teamTwoID={null}
                isGlobalShow
            />
        )

    };


    render() {
        return (
            <div>
                <Switch>
                    <Route path='/network/keeper' render={this.renderKeeper}/>
                    <Route path='/network' exact component={Login}/>
                    <Route path='/network/:any' render={this.redirectNetwork}/>
                    <Route path='/game/:id' render={this.renderShowGame}/>
                </Switch>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.userData
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NetworkRoute);