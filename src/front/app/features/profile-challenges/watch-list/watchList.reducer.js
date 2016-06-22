import { List, fromJS } from 'immutable';
import { WATCH_LIST_CHALLENGES_RECEIVED, ADDED_TO_ACCEPTED_LIST } from './watchList.actions';

const watchList = (state = new List(), action) => {
    switch (action.type) {
    case WATCH_LIST_CHALLENGES_RECEIVED:
        return fromJS(action.challenges);
    case ADDED_TO_ACCEPTED_LIST:
        return state.set('isAccepted', true);
    default:
        return state;
    }
};

export default watchList;
