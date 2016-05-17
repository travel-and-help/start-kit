import { List, fromJS } from 'immutable';
import { GET_CATEGORIES, WATCH_CATEGORY } from './categories.actions';

const initialState = new List();

const categories = (state = initialState, action) => {
    switch (action.type) {
    case GET_CATEGORIES:
        return fromJS(action.categories);
    case WATCH_CATEGORY:

        return state.map((category) => {
            console.log('categoryId', category.get('_id'), action.categoryId);
            if (category.get('_id') !== action.categoryId) {
                return category;
            }
            return category.set('checked', !category.get('checked'));
        });
    default:
        return state;
    }
};

export default categories;
