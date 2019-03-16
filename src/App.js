import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {ConnectedRouter} from "react-router-redux";
import store from "./store";
import history from './history';
import {Redirect, Route, Switch} from "react-router-dom";
import Mode from "./Components/Mode";
import NetworkRoute from "./Routes/NetworkRoute";
import KeeperRoute from "./Routes/KeeperRoute";
import ShowGameRoute from "./Routes/ShowGameRoute";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div>
                        {/*<BrowserRouter basename='/test/stats'>*/}
                            <Switch>
                                <Route path='/test/stats/game/:id' component={ShowGameRoute}/>
                                <Route path='/test/stats/network/keeper/:any' component={KeeperRoute}/>
                                <Route path='/test/stats/network/keeper' component={KeeperRoute}/>
                                <Route path='/test/stats/network' component={NetworkRoute}/>
                                <Route path='/test/stats/:any' render={() => <Redirect to='/'/>}/>
                                <Route path='/test/stats/' component={Mode}/>
                            </Switch>
                        {/*</BrowserRouter>*/}
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;
