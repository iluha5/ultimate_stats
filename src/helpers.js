import {OrderedMap, Map} from 'immutable'

export function arrToMap(arr, DataRecord = Map) {
    return arr.reduce((acc, item) =>
            acc.set(item.id, new DataRecord(item))
        , new OrderedMap({}))
}

export function mapToArr(obj) {
    return obj.valueSeq().toArray()
}

export const convertPlainObjectToState = (state, DataRecord, defaultState, listKey = 'list') => {
    if (state && state.list && Object.keys(state.list).length !== 0) {
        let newMap = Object.keys(state.list).map(key => {
                return {
                    [key]: DataRecord(state.list[key])
                }
            }
        );

        return state({
            isLoading: state.isLoading,
            [listKey]: new OrderedMap(newMap)
        })
    }

    return defaultState;
};
