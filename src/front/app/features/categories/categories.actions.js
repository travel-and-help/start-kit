import api from '../../common/api';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY';

export function getCategories() {
    return function fetchCategories(dispatch) {
        api('/api/categories')
            .then((categories) => {
                dispatch({
                    type: GET_CATEGORIES,
                    categories
                });
            });
    };
}

export function toggleCategory(name) {
    // TODO: implement toggle category functionality
    return {
        type: TOGGLE_CATEGORY,
        name
    };
}
