import { fromJS, Map } from 'immutable';
import {
    GET_CHALLENGE, RESET_STATE, ADDED_TO_WATCHLIST,
    ADDED_TO_ACCEPTED_LIST,
    USER_RECEIVED, ACCEPTED_RECEIVED,
    WATCHLIST_RECEIVED
} from './challenge.actions';

const initialState = new Map();

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
    case GET_CHALLENGE:
        return upsertChallenge(action.challenge, state);
    case RESET_STATE:
        return initialState;
    case USER_RECEIVED:
        return state.set('currentUser', fromJS(action.user));
    case ACCEPTED_RECEIVED: {
        const isAccepted = action.challenges.find(challenge => (
            challenge._id === state.get('_id'))
        );
        return state.set('isAccepted', !!isAccepted);
    }
    case WATCHLIST_RECEIVED: {
        const isWatched = action.challenges.find(challenge => (
            challenge._id === state.get('_id'))
        );
        return state.set('isWatched', !!isWatched);
    }
    case ADDED_TO_WATCHLIST:
        return state.set('isWatched', true);
    case ADDED_TO_ACCEPTED_LIST:
        return state.set('isAccepted', true);
    default:
        return state;
    }
};

function upsertChallenge(challenge, state) {
    const newState = fromJS(challenge);
    const currentUser = state.get('currentUser');
    if (currentUser && currentUser.size) {
        newState.set('currentUser', currentUser);
    }
    return newState;
}

export default reducer;
