import { getChallengesByStatus } from '../profileChallengesService';
import { ACCEPTED } from '../challengeStatus';
import { push } from 'react-router-redux';

export const ACCEPTED_CHALLENGES_RECEIVED = 'ACCEPTED_CHALLENGES_RECEIVED';

export function navigate() {
    return dispatch => load()(dispatch)
        .then(() => dispatch(push('profile/accepted-challenges')));
}

export function load() {
    return dispatch => getChallengesByStatus(ACCEPTED)
        .then(challenges => dispatch({
            type: ACCEPTED_CHALLENGES_RECEIVED,
            challenges
        }));
}
