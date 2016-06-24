import { getChallengesByStatus } from '../profileChallengesService';
import { COMPLETED } from '../challengeStatus';
import { push } from 'react-router-redux';

export const COMPLETED_CHALLENGES_RECEIVED = 'COMPLETED_CHALLENGES_RECEIVED';

export function navigate() {
    return dispatch => load()(dispatch)
        .then(() => dispatch(push('profile/completed-challenges')));
}

export function load() {
    return dispatch => getChallengesByStatus(COMPLETED)
        .then(challenges => dispatch({
            type: COMPLETED_CHALLENGES_RECEIVED,
            challenges
        }));
}
