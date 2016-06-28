import api from '../../../common/api';
import { push } from 'react-router-redux';
export const WATCH_LIST_CHALLENGES_RECEIVED = 'WATCH_LIST_CHALLENGES_RECEIVED';

export function unWatch(challenge) {
    return dispatch => api(`/api/my/wish-list/${challenge.get('_id')}`, { method: 'DELETE' })
        .then(() => dispatch(load()))
        .catch(() => dispatch(load()));
}

export function navigate() {
    return dispatch => dispatch(load())
        .then(() => dispatch(push('profile/watch-list')));
}

export function load() {
    return dispatch => api('/api/my/wish-list')
        .then(challenges => dispatch({
            type: WATCH_LIST_CHALLENGES_RECEIVED,
            challenges
        }));
}
