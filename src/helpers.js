import {OrderedMap, Map} from 'immutable'

export function arrToMap(arr, DataRecord = Map) {
    return arr.reduce((acc, item) =>
            acc.set(item.id, DataRecord(item))
        , OrderedMap({}))
}

export function mapToArr(obj) {
    return obj.valueSeq().toArray()
}

export function convertPlainObjectToState (state, DataRecord, defaultState, DataStateRecord,  OrderedMap, listKey = 'list')  {
    if (state && state[listKey] && Object.keys(state[listKey]).length !== 0) {

        let newMap;
        if (listKey === 'list') {
            newMap = Object.keys(state.list).reduce((acc, key) => {
                    acc[key] = DataRecord(state.list[key]);
                    return acc;
                }
                , {}
            );
        }

        let data;
        switch (listKey) {
            case 'list':
                data = OrderedMap(newMap);
                break;
            case 'userData':
                data = DataRecord(state[listKey]);
                break;
        }

        return DataStateRecord({
            isLoading: state.isLoading,
            [listKey]: data
        })
    }

    return defaultState;
};
