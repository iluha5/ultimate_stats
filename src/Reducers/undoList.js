import {ADD, LOG_ACTION, REDO, UNDO} from "../constants";
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

        case REDO:
            // debugger
            const isEmpty = undoListState.list.size <= 1;

            return undoListState
                .set('isEmpty', isEmpty)
                .set('gameID', payload.game.id)
                .set('list', undoListState.list
                    .slice(0, undoListState.list.size - 1)
                );

        case LOG_ACTION:
            // debugger
            if (!payload.isRedo) {
                return defaultUndoListState;
            } else {
                return undoListState;
            }

        default:
            return undoListState;

    }
}