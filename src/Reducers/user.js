import {FAIL, LOAD_BEARER, LOAD_USERS, START, SUCCESS, WRONG_USER} from "../constants";
import {Map, Record} from 'immutable';

const UserData = Record({
    id: null,
    name: null,
    email: null,
    password: null,
    role: null
});

const UserState = Record({
    isLoading: false,
    userData: {}
});

const defaultUser = new UserState();

export default (userState = defaultUser, action) => {
    const {type, payload} = action;

    switch (type) {
        case LOAD_USERS + START:
            return userState
                .set('isLoading', true);
        case LOAD_USERS + SUCCESS:
            // debugger;
            return userState
                .set('isLoading', false)
                .set('userData', new UserData(payload.fullUser));
        case LOAD_BEARER + FAIL:
            console.log('----- Fail to load Users', payload);
            return userState
                .set('isLoading', false);
    }
    return userState;
}