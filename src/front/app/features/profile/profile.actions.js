export const GET_USER = 'GET_USER';

export function getUser() {
    return function fetchUser(dispatch) {
        fetch('/api/user')
            .then(response => response.json())
            .then((user) => {
                dispatch({
                    type: GET_USER,
                    user
                });
            });
    };
}
