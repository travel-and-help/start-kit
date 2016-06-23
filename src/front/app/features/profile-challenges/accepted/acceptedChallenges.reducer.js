import { List, fromJS } from 'immutable';
import { ACCEPTED_CHALLENGES_RECEIVED } from './acceptedChallenges.actions';

export default (acceptedChallenges = new List(), action) => {
    switch (action.type) {
    case ACCEPTED_CHALLENGES_RECEIVED:
        return fromJS(action.challenges);
    default:
        return acceptedChallenges;
    }
};
