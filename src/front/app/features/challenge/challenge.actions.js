import api from '../../common/api';

export const GET_CHALLENGE = 'GET_CHALLENGE';
export const RESET_STATE = 'RESET_STATE';
export const ADDED_TO_WATCHLIST = 'ADDED_TO_WATCHLIST';
export const ADDED_TO_ACCEPTED_LIST = 'ADDED_TO_ACCEPTED_LIST';
export const USER_RECEIVED = 'USER_RECEIVED';
export const ACCEPTED_RECEIVED = 'ACCEPTED_RECEIVED';
export const WATCHLIST_RECEIVED = 'WATCHLIST_RECEIVED';

const receiveChallenge = (challenge) => (
    {
        type: GET_CHALLENGE,
        challenge
    }
);

const receivedAccepted = (challenges) => (
    {
        type: ACCEPTED_RECEIVED,
        challenges
    }
);

const receiveInitialState = () => ({ type: RESET_STATE });

export function userReceived(user) {
    return {
        type: USER_RECEIVED,
        user
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

export function resetState() {
    return (dispatch) => dispatch(receiveInitialState());
}

export function getAcceptedChallenges(userId) {
    return (dispatch) => {
        api(`/api/challenge/user/${userId}/status/accepted`)
            .then(response => response.docs)
            .then((challenges) => {
                dispatch(receivedAccepted(challenges));
            });
    };
}

export function getWishList() {
    return function innerGetWish(dispatch) {
        api('/api/my/wish-list')
            .then(challenges => {
                dispatch({
                    type: WATCHLIST_RECEIVED,
                    challenges
                });
            });
    };
}
