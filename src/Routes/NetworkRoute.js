import React, {Component} from 'react';
import Login from "../Components/Login";
import Scorekeeper from "../Components/Scorekeeper";
import { Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {ADMIN, SCOREKEEPER} from "../constants";

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

    render() {
        return (
            <div>
                <Switch>
                    <Route path='/network/keeper' render={this.renderKeeper}/>
                    <Route path='/network' exact component={Login}/>
                    <Route path='/network/:any' render={this.redirectNetwork}/>
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