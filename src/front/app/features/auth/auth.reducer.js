import { fromJS } from 'immutable';
import { LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILED, LOGIN_SKIPPED } from './auth.actions';

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
    case LOGIN_SKIPPED:
        return fromJS({
            skipped: true
        });
    default:
        return state;
    }
}
