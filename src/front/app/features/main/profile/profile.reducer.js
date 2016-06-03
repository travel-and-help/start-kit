import { Map, fromJS } from 'immutable';
import {
    GET_USER,
    CREATED_CHALLENGES_RECEIVED,
    ACCEPTED_CHALLENGES_RECEIVED,
    COMPLETED_CHALLENGES_RECEIVED
} from './profile.actions';

const initialState = new Map();

export default (state = initialState, action) => {
    switch (action.type) {
    case GET_USER:
        return fromJS(action.user);
    case CREATED_CHALLENGES_RECEIVED:
        return state.set('createdChallenges', fromJS(action.challenges));
    case ACCEPTED_CHALLENGES_RECEIVED:
        return state.set('acceptedChallenges', fromJS(action.challenges));
    case COMPLETED_CHALLENGES_RECEIVED:
        return state.set('completedChallenges', fromJS(action.challenges));
    default:
        return state;
    }
};
