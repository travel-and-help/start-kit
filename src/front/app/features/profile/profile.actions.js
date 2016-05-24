import api from '../../common/api';

export const GET_USER = 'GET_USER';

export function getUser() {
    return function fetchUser(dispatch) {
        api('/api/myprofile')
            .then(response => response.json())
            .then((user) => {
                dispatch({
                    type: GET_USER,
                    user
                });
            });
    };
}
