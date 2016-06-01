import api from '../../common/api';
export const GET_CHALLENGE = 'GET_CHALLENGE';
export const RESET_STATE = 'RESET_STATE';

function receiveChallenge(challenge) {
    return {
        type: GET_CHALLENGE,
        challenge
    };
}
function receiveInitialState() {
    return {
        type: RESET_STATE
    };
}

export function fetchChallenge(id) {
    return (dispatch) => {
        api(`/api/challenge/${id}`)
            .then((challenge) => {
                dispatch(receiveChallenge(challenge));
            });
    };
}

export function resetState() {
    return (dispatch) => dispatch(receiveInitialState());
}
