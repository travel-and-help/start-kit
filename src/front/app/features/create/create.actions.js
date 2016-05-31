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
                dispatch(receiveCategories(categories));
            });
    };
}

export function postChallenge(formData) {
    return function innerPostCategories(dispatch) {
        fetch('/api/challenges/', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(formData) })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    dispatch(receiveChallenge(response.json()));
                    window.history.back();
                } else {
                    throw new Error(response.statusText);
                }
            });
    };
}

