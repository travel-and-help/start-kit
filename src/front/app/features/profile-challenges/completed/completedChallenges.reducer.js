import { List, fromJS } from 'immutable';
import { COMPLETED_CHALLENGES_RECEIVED } from './completedChallenges.actions';

export default (completedChallenges = new List(), action) => {
    switch (action.type) {
    case COMPLETED_CHALLENGES_RECEIVED:
        return fromJS(action.challenges);
    default:
        return completedChallenges;
    }
};
