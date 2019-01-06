import {FAIL, LOAD_BEARER, SUCCESS} from "../constants";

const defaultBearer = 'default';

export default (bearer = defaultBearer, action) => {
    // debugger;
    const {type, payload} = action;

    switch (type) {
        case LOAD_BEARER + SUCCESS:
            if (typeof payload.id === 'string') {
                return payload.id;
            }
            break;
        case LOAD_BEARER + FAIL:
            console.log('----- Fail to load Bearer', payload);
            break;
        default:
            // console.log('-----', );
    }
    return bearer;
}