export const GET_USER = 'GET_USER';

function receiveUser(user) {
    return {
        type: GET_USER,
        user
    };
}

export function getUser() {
    return function innerGetUser(dispatch) {
        fetch('/api/profile')
            .then(response => response.json())
            .then((user) => {
                dispatch(receiveUser(user));
            });
    };
}

