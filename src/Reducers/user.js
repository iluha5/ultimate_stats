import {FAIL, LOAD_BEARER, LOAD_USERS, START, SUCCESS, WRONG_USER} from "../constants";
import {Map, Record} from 'immutable';
import {UserData, UserState} from "../model";

const defaultUser = UserState();

// const convertPlainObjectToUserState = (userState) => {
//     if (userState && userState.userData) {
//         return UserState({
//             isLoading: userState.isLoading,
//             userData: UserData(userState.userData)
//         })
//     }
//
//     return defaultUser;
// };

export default (userState = defaultUser, action) => {
    const {type, payload} = action;

    switch (type) {
        case LOAD_USERS + START:
            // debugger
            return userState
                .set('isLoading', true);
        case LOAD_USERS + SUCCESS:
            // debugger;
            return userState
                .set('isLoading', false)
                .set('userData', UserData(payload.fullUser));
        case LOAD_BEARER + FAIL:
            console.log('----- Fail to load Users', payload);
            return userState
                .set('isLoading', false);
    }
    return userState;
}