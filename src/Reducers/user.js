import {FAIL, LOAD_BEARER, LOAD_USERS, LOGOUT, START, SUCCESS} from "../constants";
import {UserData, UserState} from "../model";

const defaultUser = UserState();

export default (userState = defaultUser, action) => {
    const {type, payload} = action;

    switch (type) {
        case LOAD_USERS + START:
            return userState
                .set('isLoading', true);
        case LOAD_USERS + SUCCESS:
            return userState
                .set('isLoading', false)
                .set('userData', UserData(payload.fullUser));
        case LOAD_BEARER + FAIL:
            console.log('----- Fail to load Users', payload);
            return userState
                .set('isLoading', false);
        case LOGOUT:
            return defaultUser;
        default:
            return userState;
    }
}