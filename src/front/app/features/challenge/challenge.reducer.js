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
        return upsertCurrentUser(action.user, state);
    case ACCEPTED_RECEIVED:
        return state.setIn(['currentUser', 'acceptedChallenges'], fromJS(action.challenges));
    case WATCHLIST_RECEIVED:
        return state.setIn(['currentUser', 'watchList'], fromJS(action.challenges));
    case ADDED_TO_WATCHLIST:
        return state.set('isWatched', true);
    case ADDED_TO_ACCEPTED_LIST:
        return state.set('isAccepted', true);
    default:
        return state;
    }
};

function combine(state) {
    const watchList = state.getIn(['currentUser', 'watchList']);
    const accepted = state.getIn(['currentUser', 'acceptedChallenges']);
    if (watchList) {
        state.set('isWatched', watchList.indexOf(state.get('_id')) > -1);
    }
    if (accepted) {
        state.set('isAccepted', accepted.indexOf(state.get('_id')) > -1);
    }
    return state;
}

function upsertCurrentUser(user, state) {
    const newState = fromJS({ currentUser: user });
    return state.size ? combine(state.set('currentUser', user)) : newState;
}

function upsertChallenge(challenge, state) {
    const newState = fromJS(challenge);
    const currentUser = state.get('currentUser');
    return currentUser.size ? combine(newState.set('currentUser', currentUser)) : newState;
}

export default reducer;
