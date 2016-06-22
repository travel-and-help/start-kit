import api from '../../../common/api';

export const WATCH_LIST_CHALLENGES_RECEIVED = 'WATCH_LIST_CHALLENGES_RECEIVED';
export const ADDED_TO_ACCEPTED_LIST = 'ADDED_TO_ACCEPTED_LIST';

export function getWatchedChallenges() {
    return fetchChallenges;
}

export function unWatch(challenge) {
    return function unWatchChallenge(dispatch) {
        api(`/api/my/wish-list/${challenge.get('_id')}`, { method: 'DELETE' })
            .then(() => fetchChallenges(dispatch))
            .catch(() => fetchChallenges(dispatch));
    };
}

function fetchChallenges(dispatch) {
    api('/api/my/wish-list')
        .then(challenges => {
            dispatch({
                type: WATCH_LIST_CHALLENGES_RECEIVED,
                challenges
            });
        });
}

export function acceptChallenge(challenge) {
    return dispatch => api(`/api/my/accepted-challenges/${challenge.get('_id')}`, { method: 'PUT' })
        .then(() => dispatch({ type: ADDED_TO_ACCEPTED_LIST, challenge }))
        // eslint-disable-next-line no-alert
        .catch(alert.bind(null, 'Unable to accept the challenge =('));
}
