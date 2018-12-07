import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {ConnectedRouter} from "react-router-redux";
import store from "./store";
import history from './history';
import {NavLink, Redirect, Route, Switch} from "react-router-dom";
import Login from "./Components/Login";
import Mode from "./Components/Mode";
import LoginFailed from "./Components/AlarmSnackBar";
import Scorekeeper from "./Components/Scorekeeper";
import NetworkRoute from "./Routes/NetworkRoute";
import KeeperRoute from "./Routes/KeeperRoute";
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div>
                        <Switch>
                            {/*<Route path='/network' component={Login}/>*/}
                            <Route path='/network/keeper/:any' component={KeeperRoute}/>
                            <Route path='/network/keeper' component={KeeperRoute}/>
                            <Route path='/network' component={NetworkRoute}/>
                            <Route path='/:any' render={() => <Redirect to='/' />}/>
                            <Route path='/' component={Mode}/>
                        </Switch>
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;
