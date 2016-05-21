import { List, fromJS } from 'immutable';
import { WATCH_LIST_CHALLENGES_RECEIVED } from './watchList.actions';

const initialState = new List();

const watchList = (state = initialState, action) => {
    switch (action.type) {
    case WATCH_LIST_CHALLENGES_RECEIVED:
        return fromJS(action.challenges);
    default:
        return state;
    }
};

export default watchList;
