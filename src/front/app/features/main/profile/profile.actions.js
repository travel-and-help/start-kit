import api from '../../../common/api';

export const PROFILE_RECEIVED = 'PROFILE_RECEIVED';

export function load() {
    return dispatch => api('/api/profile/my')
        .then(profile => dispatch({
            type: PROFILE_RECEIVED,
            profile
        }));
}
