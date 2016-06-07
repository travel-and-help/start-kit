export const GET_CATEGORIES = 'GET_CATEGORIES';
export const POST_CHALLENGE = 'POST_CHALLENGE';
import api from '../../common/api';

function receiveCategories(categories) {
    return {
        type: GET_CATEGORIES,
        categories
    };
}

function receiveChallenge(challenge) {
    return {
        type: POST_CHALLENGE,
        challenge
    };
}

export function fetchCategories() {
    return function innerFetchCategories(dispatch) {
        api('/api/categories')
            .then((categories) => {
                dispatch(receiveCategories(categories));
            });
    };
}

export function postChallenge(formData) {
    return function innerPostCategories(dispatch) {
        api('/api/challenges/', {
            method: 'POST',
            body: JSON.stringify(formData) })
            .then((response) => {
                dispatch(receiveChallenge(response));
                window.history.back();
            });
    };
}

