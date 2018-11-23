import {FAIL, LOAD_BEARER, LOAD_USERS, SUCCESS, WRONG_USER} from "../constants";

const defaultUser = {};

export default (user = defaultUser, action) => {
    const {type, payload} = action;

    switch (type) {
        case LOAD_USERS + SUCCESS:
            // debugger;
            if (Array.isArray(payload.response)) {
                let fullUser = payload.response.find(el => {
                    return el.password === payload.user.password && el.email === payload.user.email;
                });

                if (!fullUser) return WRONG_USER;

                return fullUser;
            }
            break;
        case LOAD_BEARER + FAIL:
            console.log('----- Fail to load Users', payload);
            break;
    }
    return user;
}