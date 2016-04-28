import { GET_CATEGORIES, TOGGLE_CATEGORY } from './../actions/categories';

const categories = (state = [], action) => {
    switch (action.type) {
    case GET_CATEGORIES:
        return action.categories;
    case TOGGLE_CATEGORY:
        // TODO: implement toggle category functionality
        return state;
    default:
        return state;
    }
};

export default categories;
