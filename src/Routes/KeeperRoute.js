import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Login from "../Components/Login";
import Scorekeeper from "../Components/Scorekeeper";
import Mode from "../Components/Mode";
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {ADMIN, SCOREKEEPER} from "../constants";
import Tournament from "../Components/Tournament";

class NetworkRoute extends Component {
    renderKeeper = () => {
        const {user} = this.props;

        return (user && (user.role === SCOREKEEPER || user.role === ADMIN )) ? (
            <Tournament />
        ) : (
            <Redirect to='/network' />
        )
    };

    redirectKeeper = () => <Redirect to='/network/keeper' />;

    // renderLogin = () => <Redirect to='/network' />;

    render() {
        return (
            <div>
                <Switch>
                    <Route path='/network/keeper/tournament' render={this.renderKeeper}/>
                    <Route path='/network/keeper' exact component={Scorekeeper} />
                    <Route path='/network/keeper/:any' render={this.redirectKeeper}/>
                </Switch>

            </div>
        );
    }
}

NetworkRoute.propTypes = {};

const mapStateToProps = (state) => {
    return {
        user: state.user.userData
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NetworkRoute);