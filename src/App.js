import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {ConnectedRouter} from "react-router-redux";
import store from "./store";
import history from './history';
import {Redirect, Route, Switch} from "react-router-dom";
import Mode from "./Components/Mode";
import NetworkRoute from "./Routes/NetworkRoute";
import KeeperRoute from "./Routes/KeeperRoute";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div>
                        <Switch>
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
