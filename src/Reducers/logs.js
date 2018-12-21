import {FAIL, LOAD_LOG, LOG_ACTION, PULL, SHOULD_RELOAD, START, SUCCESS, THROW, TURNOVER} from "../constants";
import {arrToDataArr, arrToMap, convertLogObjToRecord} from "../helpers";
import {LogData, LogLineData, LogsState} from "../model";

const defaultLogsState = LogsState();

export default (logsState = defaultLogsState, action) => {
    const {type, payload} = action;
    // debugger
    // const {id} = payload;
    let newState;

    switch (type) {
        case LOAD_LOG + START:
            newState = logsState
                .set(
                    'list', logsState.list
                        .set(
                            payload.id, LogData()
                                .set('isLoading', true)
                                .set('id', payload.id)
                                .set('isError', false)
                        )
                );

            return newState;

        case LOAD_LOG + SUCCESS:
            // const recordedLogs = payload.map(log => convertLogObjToRecord(log, LogLineData));

            newState = logsState
                .set(
                    'list', logsState.list
                        .set(
                            payload.id, logsState.list.get(payload.id)
                                .set('isLoading', false)
                                .set('shouldReload', false)
                                .set('logList', arrToDataArr(payload.list, LogLineData))
                        )
                );

            return newState;

        case LOAD_LOG + SHOULD_RELOAD:
            return logsState.list
                .set([payload.id, 'shouldReload'], true);

        case LOAD_LOG + FAIL:
            newState = logsState
                .set(
                    'list', logsState.list
                        .set(
                            payload.id, LogData()
                                .set('isLoading', false)
                                .set('shouldReload', false)
                                .set('isError', true)
                                .set('id', payload.id)
                        )
                );

            return newState;

        case LOG_ACTION:
            // debugger
            newState = logsState
                .set('list', logsState.list
                    .set(
                        payload.game.logID,  logsState.list.get(payload.game.logID)
                            .set('logList', [
                                ...logsState.list.get(payload.game.logID).logList, payload.logLine
                            ])
                        )
                );
// debugger
            return newState;

        default:
            return logsState;

    }
}