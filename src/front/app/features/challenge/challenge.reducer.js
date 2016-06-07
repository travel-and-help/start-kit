import { fromJS, Map } from 'immutable';
import {
    GET_CHALLENGE, RESET_STATE, ADDED_TO_WATCHLIST,
    ADDED_TO_ACCEPTED_LIST, ACCEPTED_RECEIVED,
    WATCHLIST_RECEIVED
} from './challenge.actions';

const initialState = new Map();

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
    case GET_CHALLENGE:
        return state.mergeDeep(fromJS(action.challenge));
    case RESET_STATE:
        return initialState;
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

export default reducer;
