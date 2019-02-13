import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import GameViewLog from "../Components/GameViewLog";

class ShowGameRoute extends Component {
    renderShowGame = ({match}) => {
        const {id} = match.params;

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
                    <Route path='/game/:id' render={this.renderShowGame}/>
                </Switch>
            </div>
        );
    }
}

export default ShowGameRoute;