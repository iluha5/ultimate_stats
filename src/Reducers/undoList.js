import {ADD, UNDO} from "../constants";
import {LogUndoState} from "../model";

const defaultUndoListState = LogUndoState();

export default (undoListState = defaultUndoListState, action) => {
    const {type, payload} = action;

    switch (type) {
        case UNDO + ADD:
            return undoListState
                .set('isEmpty', false)
                .set('gameID', payload.game.id)
                .set('list', undoListState.list
                    .set(`${payload.logLine.id}`, payload.logLine)
                );

        default:
            return undoListState;

    }
}