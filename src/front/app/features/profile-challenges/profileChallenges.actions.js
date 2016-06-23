import { CREATED, ACCEPTED, COMPLETED } from './challengeStatus';

import {
    navigate as toCreated, load as loadCreated
} from './created/createdChallenges.actions';

import {
    navigate as toAccepted, load as loadAccepted
} from './accepted/acceptedChallenges.actions';

import {
    navigate as toCompleted, load as loadCompleted
} from './completed/completedChallenges.actions';

const navigationMap = {
    [CREATED]: toCreated,
    [ACCEPTED]: toAccepted,
    [COMPLETED]: toCompleted
};

export function navigate(type) {
    return navigationMap[type]();
}

export function load() {
    return dispatch => {
        loadCreated()(dispatch);
        loadAccepted()(dispatch);
        loadCompleted()(dispatch);
    };
}
