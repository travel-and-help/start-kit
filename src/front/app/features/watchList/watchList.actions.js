import api from '../../common/api';

export const WATCH_LIST_CHALLENGES_RECEIVED = 'WATCH_LIST_CHALLENGES_RECEIVED';

export function getInitialChallenges() {
    return function fetchChallenges(dispatch) {
        api('/api/users/572af81c1f9056926b4a1634/challenges')
            .then(challenges => {
                dispatch({
                    type: WATCH_LIST_CHALLENGES_RECEIVED,
                    challenges
                });
            });
    };
}
