import api from '../../../common/api';

export const GET_USER = 'GET_USER';
export const CREATED_CHALLENGES_RECEIVED = 'CREATED_CHALLENGES_RECEIVED';
export const ACCEPTED_CHALLENGES_RECEIVED = 'ACCEPTED_CHALLENGES_RECEIVED';
export const COMPLETED_CHALLENGES_RECEIVED = 'COMPLETED_CHALLENGES_RECEIVED';

export function getUser(id) {
    return function fetchUser(dispatch) {
        const profileUrl = `/api/profile/${id}`;
        api(profileUrl)
            .then((user) => {
                dispatch({
                    type: GET_USER,
                    user
                });
            });
    };
}

export function getChallenges(id) {
    return function fetchUserChallenges(dispatch) {
        const acceptedUrl = `/api/challenge/user/${id}/status/accepted`;
        const createdUrl = `/api/challenge/user/${id}/status/created`;
        const completedUrl = `/api/challenge/user/${id}/status/completed`;
        const receiveCallback = (type) => (challenges) => {
            dispatch({
                type,
                challenges
            });
        };
        api(acceptedUrl)
            .then(receiveCallback(ACCEPTED_CHALLENGES_RECEIVED));
        api(createdUrl)
            .then(receiveCallback(CREATED_CHALLENGES_RECEIVED));
        api(completedUrl)
            .then(receiveCallback(COMPLETED_CHALLENGES_RECEIVED));
    };
}

