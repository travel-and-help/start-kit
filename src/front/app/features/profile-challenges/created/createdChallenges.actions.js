import { getChallengesByStatus } from '../profileChallengesService';
import { CREATED } from '../challengeStatus';
import { push } from 'react-router-redux';

export const CREATED_CHALLENGES_RECEIVED = 'CREATED_CHALLENGES_RECEIVED';

export function navigate() {
    return dispatch => load()(dispatch)
        .then(() => dispatch(push('profile/created-challenges')));
}

export function load() {
    return dispatch => getChallengesByStatus(CREATED)
        .then(challenges => dispatch({
            type: CREATED_CHALLENGES_RECEIVED,
            challenges
        }));
}
