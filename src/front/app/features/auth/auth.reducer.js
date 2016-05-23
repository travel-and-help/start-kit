import { fromJS } from 'immutable';
import { LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILED } from './auth.actions';

const initialState = fromJS({
    isLoggedIn: false
});
export default function user(state = initialState, action) {
    switch (action.type) {
    case LOGIN_ATTEMPT:
        return fromJS({
            isLoggedIn: false,
            attempt: true
        });
    case LOGIN_SUCCESS:
        return fromJS({
            isLoggedIn: true,
            token: action.token
        });
    case LOGIN_FAILED:
        return fromJS({
            isLoggedIn: false,
            info: action.info
        });
    default:
        return state;
    }
}
