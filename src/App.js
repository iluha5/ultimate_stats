import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {ConnectedRouter} from "react-router-redux";
import store from "./store";
import history from './history';
import {NavLink} from "react-router-dom";
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
                        <h2>Main menu</h2>
                        <div><NavLink activeStyle={{color: 'red'}} to="/counter">Counter</NavLink></div>
                        <div><NavLink activeStyle={{color: 'red'}} to="/filters">Filters</NavLink></div>
                        <div><NavLink activeStyle={{color: 'red'}} to="/articles">Articles</NavLink></div>
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;
