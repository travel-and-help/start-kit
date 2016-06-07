import { GET_CATEGORIES, POST_CHALLENGE } from './create.actions';

const reducer = (state = [], action = {}) => {
    switch (action.type) {
    case GET_CATEGORIES:
        return action.categories;
    case POST_CHALLENGE:
        return action.challenge;
    default:
        return state;
    }
};

export default reducer;
