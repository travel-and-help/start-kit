import { List, fromJS } from 'immutable';
import { CREATED_CHALLENGES_RECEIVED } from './createdChallenges.actions';

export default (createdChallenges = new List(), action) => {
    switch (action.type) {
    case CREATED_CHALLENGES_RECEIVED:
        return fromJS(action.challenges);
    default:
        return createdChallenges;
    }
};
