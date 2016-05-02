import { List, fromJS } from 'immutable';
import { GET_CATEGORIES, TOGGLE_CATEGORY } from './../actions/categories';

const initialState = new List();

const categories = (state = initialState, action) => {
    switch (action.type) {
    case GET_CATEGORIES:
        return fromJS(action.categories);
    case TOGGLE_CATEGORY:
        // TODO: implement toggle category functionality
        return state;
    default:
        return state;
    }
};

export default categories;
