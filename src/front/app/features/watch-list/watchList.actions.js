import api from '../../common/api';

export const WATCH_LIST_CHALLENGES_RECEIVED = 'WATCH_LIST_CHALLENGES_RECEIVED';

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
