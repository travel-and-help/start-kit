import api from '../../../common/api';
import { push } from 'react-router-redux';
export const WATCH_LIST_CHALLENGES_RECEIVED = 'WATCH_LIST_CHALLENGES_RECEIVED';
export const ADDED_TO_ACCEPTED_LIST = 'ADDED_TO_ACCEPTED_LIST';

export function unWatch(challenge) {
    return function unWatchChallenge(dispatch) {
        api(`/api/my/wish-list/${challenge.get('_id')}`, { method: 'DELETE' })
            .then(() => fetchWishList(dispatch))
            .catch(() => fetchWishList(dispatch));
    };
}

export function navigate() {
    return dispatch => fetchWishList(dispatch)
        .then(() => dispatch(push('profile/watch-list')));
}

function fetchWishList(dispatch) {
    return api('/api/my/wish-list')
        .then(challenges => dispatch({
            type: WATCH_LIST_CHALLENGES_RECEIVED,
            challenges
        }));
}

export function acceptChallenge(challenge) {
    return dispatch => api(`/api/my/accepted-challenges/${challenge.get('_id')}`, { method: 'PUT' })
        .then(() => dispatch({ type: ADDED_TO_ACCEPTED_LIST, challenge }))
        // eslint-disable-next-line no-alert
        .catch(alert.bind(null, 'Unable to accept the challenge =('));
}
