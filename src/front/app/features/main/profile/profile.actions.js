import api from '../../../common/api';

export const GET_USER = 'GET_USER';

export function getUser(id) {
    return function fetchUser(dispatch) {
        const profileUrl = `/api/profile/${id}`;
        api(profileUrl)
            .then((user) => {
                dispatch({
                    type: GET_USER,
                    user
                });
            });
    };
}
