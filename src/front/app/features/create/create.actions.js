export const GET_CATEGORIES = 'GET_CATEGORIES';
export const POST_CHALLENGE = 'POST_CHALLENGE';

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
        fetch('/api/categories/')
            .then(response => response.json())
            .then((categories) => {
                console.log(categories);
                dispatch(receiveCategories(categories));
            });
    };
}

export function postChallenge(formData) {
    return function innerPostCategories(dispatch) {
        fetch('/api/challenges/', {
            method: 'POST',
            body: JSON.stringify(formData) })

            .then(response => response.json())
            .then((challenge) => {
                dispatch(receiveChallenge(challenge));
            });
    };
}

