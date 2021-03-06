import { hashHistory } from 'react-router';

import api from '../../common/api';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const WATCH_CATEGORY = 'WATCH_CATEGORY';

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

export function watchCategory(categoryId) {
    return {
        type: WATCH_CATEGORY,
        categoryId
    };
}

export function saveCategories(categories) {
    return function postCategories() {
        api('/api/categories', {
            method: 'POST',
            body: JSON.stringify(categories)
        }).then(() => {
            hashHistory.push('main/challenges');
        });
    };
}
