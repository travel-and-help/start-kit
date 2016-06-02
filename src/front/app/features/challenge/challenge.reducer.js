import { fromJS, Map } from 'immutable';
import { GET_CHALLENGE, RESET_STATE } from './challenge.actions';

const initialState = new Map();

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
    case GET_CHALLENGE:
        return fromJS(action.challenge);
    case RESET_STATE:
        return initialState;
    default:
        return state;
    }
};

export default reducer;
