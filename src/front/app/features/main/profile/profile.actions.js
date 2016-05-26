import api from '../../../common/api';

export const GET_USER = 'GET_USER';

export function getUser() {
    return function fetchUser(dispatch) {
        api('/api/myprofile')
            .then((user) => {
                dispatch({
                    type: GET_USER,
                    user
                });
            });
    };
}
