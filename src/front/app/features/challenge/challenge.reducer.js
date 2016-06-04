import { fromJS, Map } from 'immutable';
import { GET_USER } from '../main/profile/profile.actions';
import {
    GET_CHALLENGE, RESET_STATE, ADDED_TO_WATCHLIST, ADDED_TO_ACCEPTED_LIST
} from './challenge.actions';

const initialState = new Map();

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
    case GET_CHALLENGE:
        return upsertChallenge(action.challenge, state);
    case RESET_STATE:
        return initialState;
    case GET_USER:
        return upsertCurrentUser(action.user, state);
    case ADDED_TO_WATCHLIST:
        return state.set('isWatched', true);
    case ADDED_TO_ACCEPTED_LIST:
        return state.set('isAccepted', true);
    default:
        return state;
    }
};

function combine(state) {
    return state
        .set('isWatched', state.get('currentUser').watchList.indexOf(state.get('_id')) > -1)
        .set('isAccepted', state.get('currentUser').challenges.some(
            ({ status, challenge }) => (status === 'accepted' && challenge === state.get('_id'))
        ));
}

function upsertCurrentUser(user, state) {
    const newState = fromJS({ currentUser: user });
    return state.size ? combine(state.set('currentUser', user)) : newState;
}

function upsertChallenge(challenge, state) {
    const newState = fromJS(challenge);
    return state.size ? combine(newState.set('currentUser', state.get('currentUser'))) : newState;
}

export default reducer;
