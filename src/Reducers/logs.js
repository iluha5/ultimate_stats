import {LOAD_LOG, SHOULD_RELOAD, START, SUCCESS} from "../constants";
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
        default:
            return logsState;

    }
}