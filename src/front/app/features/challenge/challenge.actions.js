import api from '../../common/api';
export const GET_CHALLENGE = 'GET_CHALLENGE';
export const GET_SIMILAR_CHALLENGE = 'GET_SIMILAR_CHALLENGE';
export const RESET_STATE = 'RESET_STATE';
export const ADDED_TO_WATCHLIST = 'ADDED_TO_WATCHLIST';
export const ADDED_TO_ACCEPTED_LIST = 'ADDED_TO_ACCEPTED_LIST';

const receiveChallenge = (challenge) => (
    {
        type: GET_CHALLENGE,
        challenge
    }
);

const receiveSimilarChallenges = (id, challenges) => (
    {
        type: GET_SIMILAR_CHALLENGE,
        id,
        challenges
    }
);

const receiveInitialState = () => ({ type: RESET_STATE });

export function fetchChallenge(id) {
    return (dispatch) => {
        api(`/api/challenge/${id}`)
            .then((challenge) => {
                dispatch(receiveChallenge(challenge));
            });
    };
}

export function watchChallenge(challengeId) {
    return dispatch => api(`/api/my/wish-list/${challengeId}`, { method: 'PUT' })
        .then(() => dispatch({ type: ADDED_TO_WATCHLIST, challengeId }))
        // eslint-disable-next-line no-alert
        .catch(alert.bind(null, 'Unable to add the challenge =('));
}

export function acceptChallenge(challengeId) {
    return dispatch => api(`/api/my/accepted-challenges/${challengeId}`, { method: 'PUT' })
        .then(() => dispatch({ type: ADDED_TO_ACCEPTED_LIST, challengeId }))
        // eslint-disable-next-line no-alert
        .catch(alert.bind(null, 'Unable to accept the challenge =('));
}

export function completeChallenge(id, data) {
    return () => api(`/api/challenge/${id}/complete`,
        {
            method: 'POST',
            body: data
        }
    );
}

export function fetchSimilarChallenge(id) {
    return dispatch => api(`/api/challenge/search?similar=${id}`, { method: 'GET' })
        .then((challenges) => {
            dispatch(receiveSimilarChallenges(id, challenges));
        });
}

export function resetState() {
    return (dispatch) => dispatch(receiveInitialState());
}
