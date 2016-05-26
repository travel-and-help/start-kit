import { fromJS, Map } from 'immutable';
import { GET_CHALLENGE } from './challenge.actions';

const initialState = new Map();

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
    case GET_CHALLENGE:
        return fromJS(action.challenge);
    default:
        return state;
    }
};

export default reducer;
