import {
    ADD, CLEAR_GAME,
    FAIL,
    LOAD_LOG,
    LOG_ACTION,
    SHOULD_RELOAD,
    SHOULD_UPLOAD,
    START,
    SUCCESS,
    UNDO, UPLOAD_LOG
} from "../constants";
import {arrToDataArr} from "../helpers";
import {LogData, LogLineData, LogsState} from "../model";

const defaultLogsState = LogsState();

export default (logsState = defaultLogsState, action) => {
    const {type, payload} = action;
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
            newState = logsState
                .set('list', logsState.list
                    .set(
                        payload.game.logID, logsState.list.get(payload.game.logID)
                            .set('logList', [
                                ...logsState.list.get(payload.game.logID).logList, payload.logLine.set('gameSnapshot', payload.game)
                            ])

                    )
                );
            return newState;

        case UPLOAD_LOG + START:
            newState = logsState
                .set(
                    'list', logsState.list
                        .set(
                            payload.id, logsState.list.get(payload.id)
                                .set('shouldUpload', false)
                                .set('isUploading', true)
                        )
                );
            return newState;


        case UPLOAD_LOG + SUCCESS:
            newState = logsState
                .set(
                    'list', logsState.list
                        .set(
                            payload.id, logsState.list.get(payload.id)
                                .set('isUploading', false)
                        )
                );
            return newState;


        case UPLOAD_LOG + FAIL:
            // debugger
            // newState = logsState
            //     .set(
            //         'list', logsState.list
            //             .set(
            //                 payload.id, logsState.list.get(payload.id)
            //                     .set('shouldUpload', true)
            //             )
            //     );
            // return newState;
            return logsState;

        case UPLOAD_LOG + SHOULD_UPLOAD:
            // newState = logsState
            //     .set(
            //         'list', logsState.list
            //             .set(
            //                 payload.id, logsState.list.get(payload.id)
            //                     .set('shouldUpload', true)
            //             )
            //     );
            return newState;

        case UNDO + ADD:
            newState = logsState
                .set('list', logsState.list
                    .set(
                        payload.game.logID, logsState.list.get(payload.game.logID)
                            .set('logList', [
                                ...logsState.list.get(payload.game.logID).logList
                            ].slice(0, -1))
                    )
                );
            return newState;

        case CLEAR_GAME:
            newState = logsState
                .set('list', logsState.list
                    .set(
                        payload.game.logID, LogData()
                            .set('id', payload.game.logID)
                            .set('shouldReload', false)
                    )
                );
            return newState;

        default:
            return logsState;
    }
}