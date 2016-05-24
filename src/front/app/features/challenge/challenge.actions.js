import api from '../../common/api';
export const GET_CHALLENGE = 'GET_CHALLENGE';

function receiveChallenge(challenge) {
    return {
        type: GET_CHALLENGE,
        challenge
    };
}

export function fetchChallenge(id) {
    return function innerFetchChallenge(dispatch) {
        api(`/api/challenge/${id}`)
            .then((challenge) => {
                dispatch(receiveChallenge(challenge));
            });
    };
}
