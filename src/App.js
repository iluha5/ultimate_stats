import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {ConnectedRouter} from "react-router-redux";
import store from "./store";
import history from './history';
import {NavLink, Route, Switch} from "react-router-dom";
import Login from "./Components/Login";
import Mode from "./Components/Mode";
import LoginFailed from "./Components/AlarmSnackBar";
import Scorekeeper from "./Components/Scorekeeper";
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
                            <Route path='/network/keeper' component={Scorekeeper}/>
                            <Route path='/network' component={Login}/>
                            <Route path='/' component={Mode}/>
                        </Switch>
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;
