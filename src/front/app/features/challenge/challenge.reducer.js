import { fromJS, Map } from 'immutable';
import {
    GET_CHALLENGE, RESET_STATE, ADDED_TO_WATCHLIST, ADDED_TO_ACCEPTED_LIST
} from './challenge.actions';

const initialState = new Map();

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
    case GET_CHALLENGE:
        return fromJS(action.challenge);
    case RESET_STATE:
        return initialState;
    case ADDED_TO_WATCHLIST:
    case ADDED_TO_ACCEPTED_LIST:
    default:
        return state;
    }
};

export default reducer;
