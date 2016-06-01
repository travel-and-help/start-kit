import { List, fromJS } from 'immutable';
import { WATCH_LIST_CHALLENGES_RECEIVED } from './watchList.actions';

const watchList = (state = new List(), action) => {
    switch (action.type) {
    case WATCH_LIST_CHALLENGES_RECEIVED:
        return fromJS(action.challenges);
    default:
        return state;
    }
};

export default watchList;
