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
        const acceptedUrl = `http://localhost:9000/api/challenge/user/${id}/status/accepted`;
        const createdUrl = `http://localhost:9000/api/challenge/user/${id}/status/created`;
        const completedUrl = `http://localhost:9000/api/challenge/user/${id}/status/completed`;
        fetch(acceptedUrl)
            .then((response) => response.json())
            .then((response) => {
                const challenges = response.docs;
                dispatch({
                    type: ACCEPTED_CHALLENGES_RECEIVED,
                    challenges
                });
            });
        fetch(createdUrl)
            .then((response) => response.json())
            .then((response) => {
                const challenges = response.docs;
                dispatch({
                    type: CREATED_CHALLENGES_RECEIVED,
                    challenges
                });
            });
        fetch(completedUrl)
            .then((response) => response.json())
            .then((response) => {
                const challenges = response.docs;
                dispatch({
                    type: COMPLETED_CHALLENGES_RECEIVED,
                    challenges
                });
            });
    };
}

