import { List, fromJS } from 'immutable';
import { GET_CHALLENGES } from './challenges.actions';

const initialState = new List();

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case GET_CHALLENGES:
        return fromJS(action.challenges);
    default:
        return state;
    }
};

export default reducer;
