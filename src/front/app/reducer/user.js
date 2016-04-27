import * as types from '../constants/login';

const initialState = {
    isLoggedIn: false
};
export default function user(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_ATTEMPT:
            return state;
        case types.LOGIN_SUCCESS:
            return {
                isLoggedIn: true,
                token: action.token
            };
        case types.LOGIN_FAILED:
            return {
                isLoggedIn: false,
                info: action.info
            };
        case types.LOGOUT:
        default:
            return state;
    }
}
