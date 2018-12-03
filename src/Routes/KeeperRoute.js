import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Login from "../Components/Login";
import Scorekeeper from "../Components/Scorekeeper";
import Mode from "../Components/Mode";
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {ADMIN, SCOREKEEPER} from "../constants";
import Tournament from "../Components/Tournament";

class KeeperRoute extends Component {
    // renderKeeper = () => {
    //     const {user} = this.props;
    //
    //     return (user && (user.role === SCOREKEEPER || user.role === ADMIN )) ? (
    //         <Scorekeeper />
    //     ) : (
    //         <Redirect to='/network' />
    //     )
    // };
    //
    // redirectKeeper = () => <Redirect to='/network/keeper' />;

    renderTournament = ({match}) => {
        const {id} = match.params;
// debugger
        return <Tournament id={id}/>
    };
    // renderLogin = () => <Redirect to='/network' />;

    render() {
        return (
            <div>
                <Switch>
                    <Route path='/network/keeper/tournament/:id' render={this.renderTournament}/>
                    <Redirect path='/network/keeper/tournament' exact to='/network/keeper/'  />
                    {/*<Route path='/network/keeper/tournament' render={this.renderKeeper}/>*/}
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