import {
    FAIL,
    SHOULD_RELOAD,
    START,
    SUCCESS, VIEW_LOAD_LOG,
} from "../constants";
import {arrToDataArr} from "../helpers";
import {ViewLogData, ViewLogLineData, ViewLogsState} from "../model";

const defaultViewLogsState = ViewLogsState();

export default (viewLogsState = defaultViewLogsState, action) => {
    const {type, payload} = action;
    let newState;
// debugger
    switch (type) {
        case VIEW_LOAD_LOG + START:
            // debugger
            newState = viewLogsState
                .set(
                    'list', viewLogsState.list
                        .set(
                            payload.id, ViewLogData()
                                .set('isLoading', true)
                                .set('id', payload.id)
                                .set('isError', false)
                        )
                );
            return newState;

        case VIEW_LOAD_LOG + SUCCESS:
            newState = viewLogsState
                .set(
                    'list', viewLogsState.list
                        .set(
                            payload.id, viewLogsState.list.get(payload.id)
                                .set('isLoading', false)
                                .set('shouldReload', false)
                                .set('logList', arrToDataArr(payload.list, ViewLogLineData))
                        )
                );
            return newState;

        case VIEW_LOAD_LOG + SHOULD_RELOAD:
            return viewLogsState.list
                .set([payload.id, 'shouldReload'], true);

        case VIEW_LOAD_LOG + FAIL:
            newState = viewLogsState
                .set(
                    'list', viewLogsState.list
                        .set(
                            payload.id, ViewLogData()
                                .set('isLoading', false)
                                .set('shouldReload', false)
                                .set('isError', true)
                                .set('id', payload.id)
                        )
                );
            return newState;

        default:
            return viewLogsState;
    }
}