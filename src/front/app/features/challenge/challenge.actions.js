export const GET_CHALLENGE = 'GET_CHALLENGE';
export const PASS_CHALLENGE = 'PASS_CHALLENGE';

function receiveChallenge(challenge) {
    return {
        type: GET_CHALLENGE,
        challenge
    };
}

export function fetchChallenge(id) {
    return function innerFetchChallenge(dispatch) {
        fetch('http://localhost:9000/api/challenge/' + id)
        //fetch('/api/challenge' + id)
            .then(response => response.json())
            .then((challenge) => {
                dispatch(receiveChallenge(challenge));
            });
    };
}
