import api from '../../../common/api';

export const GET_CHALLENGES = 'GET_CHALLENGES';

function receiveChallenges(challenges) {
    return {
        type: GET_CHALLENGES,
        challenges
    };
}

export function fetchChallenges() {
    return function innerFetchChallenges(dispatch) {
        api('/api/challenges')
            .then(response => response.json())
            .then((challenges) => {
                dispatch(receiveChallenges(challenges));
            });
    };
}
