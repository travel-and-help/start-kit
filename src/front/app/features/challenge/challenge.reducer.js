import { fromJS, Map } from 'immutable';
import {
    GET_CHALLENGE, GET_SIMILAR_CHALLENGE, RESET_STATE, ADDED_TO_WATCHLIST,
    ADDED_TO_ACCEPTED_LIST, ACCEPTED_RECEIVED,
    WATCHLIST_RECEIVED
} from './challenge.actions';

const initialState = new Map();

const checkChallenges = (challenges, state) => (
    challenges.find(challenge => (
        challenge._id === state.get('_id'))
    )
);

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case GET_CHALLENGE:
        return state.mergeDeep(fromJS(action.challenge));
    case GET_SIMILAR_CHALLENGE:
        return state.mergeDeep(fromJS({
            similar: {
                [action.id]: action.challenges
            }
        }));
    case RESET_STATE:
        return initialState;
    case ACCEPTED_RECEIVED: {
        return state.set('isAccepted', !!checkChallenges(action.challenges, state));
    }
    case WATCHLIST_RECEIVED: {
        return state.set('isWatched', !!checkChallenges(action.challenges, state));
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
