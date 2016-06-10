import { fromJS, Map } from 'immutable';
import { GET_CATEGORIES, POST_CHALLENGE } from './create.actions';

const initialState = new Map();

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case GET_CATEGORIES:
        return state.set('categories', fromJS(action.categories));
    case POST_CHALLENGE:
        return state.set('challenge', fromJS(action.challenge));
    default:
        return state;
    }
};

export default reducer;
