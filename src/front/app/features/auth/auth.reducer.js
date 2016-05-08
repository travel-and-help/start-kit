import { LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from './auth.actions';

const initialState = {
    isLoggedIn: false
};
export default function user(state = initialState, action) {
    switch (action.type) {
    case LOGIN_ATTEMPT:
        return state;
    case LOGIN_SUCCESS:
        return {
            isLoggedIn: true,
            token: action.token
        };
    case LOGIN_FAILED:
        return {
            isLoggedIn: false,
            info: action.info
        };
    case LOGOUT:
    default:
        return state;
    }
}
