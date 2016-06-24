import sut from './challenge.reducer';
import { Map, fromJS } from 'immutable';
import {
    GET_CHALLENGE,
    GET_SIMILAR_CHALLENGE,
    RESET_STATE,
    ADDED_TO_WATCHLIST,
    ADDED_TO_ACCEPTED_LIST,
} from './challenge.actions';

import {
    ACCEPTED_CHALLENGES_RECEIVED
} from '../profile-challenges/accepted/acceptedChallenges.actions';

import {
    WATCH_LIST_CHALLENGES_RECEIVED
} from '../profile-challenges/watch-list/watchList.actions';

describe('reducer/challenge', () => {
    it('should handle initial state', () => {
        sut(undefined, {}).toJS().should.eqls({});
    });

    it('should add challenge to state', () => {
        const action = {
            type: GET_CHALLENGE,
            challenge: { 1: '1', 2: '2', 3: '3' }
        };
        const expectedState = fromJS({ 1: '1', 2: '2', 3: '3' });

        const currentState = sut(undefined, action);

        currentState.should.eqls(expectedState);
    });

    it('should add similar challenges to state', () => {
        const action = {
            type: GET_SIMILAR_CHALLENGE,
            id: 42,
            challenges: []
        };
        const expectedState = fromJS({
            similar: {
                42: []
            }
        });

        const currentState = sut(undefined, action);

        currentState.should.eqls(expectedState);
    });

    it('should ignore unknown actionTypes', () => {
        const action = { type: 'unknownType' };
        const prevState = new Map({ 1: '1', 2: '2' });
        const currentState = sut(prevState, action);

        currentState.should.eqls(prevState);
    });

    it('should reset state', () => {
        const action = {
            type: RESET_STATE
        };
        const expectedState = new Map();

        const currentState = sut(undefined, action);

        currentState.should.eqls(expectedState);
    });

    it('should add isAccepted flag to state if challenge is accepted by user', () => {
        const action = {
            type: ACCEPTED_CHALLENGES_RECEIVED,
            challenges: [
                { _id: 1 },
                { _id: 2 }
            ]
        };
        const prevState = fromJS({ _id: 1 });

        const expectedState = prevState.set('isAccepted', true);

        const currentState = sut(prevState, action);

        currentState.should.eqls(expectedState);
    });

    it('should NOT add isAccepted flag to state if challenge is NOT accepted by user', () => {
        const action = {
            type: ACCEPTED_CHALLENGES_RECEIVED,
            challenges: [
                { _id: 1 },
                { _id: 2 }
            ]
        };
        const prevState = fromJS({ _id: 3 });

        const expectedState = prevState.set('isAccepted', false);

        const currentState = sut(prevState, action);

        currentState.should.eqls(expectedState);
    });

    it('should add isWatched flag to state if challenge is watched by user', () => {
        const action = {
            type: WATCH_LIST_CHALLENGES_RECEIVED,
            challenges: [
                { _id: 1 },
                { _id: 2 }
            ]
        };
        const prevState = fromJS({ _id: 1 });

        const expectedState = prevState.set('isWatched', true);

        const currentState = sut(prevState, action);

        currentState.should.eqls(expectedState);
    });

    it('should NOT add isWatched flag to state if challenge is NOT watched by user', () => {
        const action = {
            type: WATCH_LIST_CHALLENGES_RECEIVED,
            challenges: [
                { _id: 1 },
                { _id: 2 }
            ]
        };
        const prevState = fromJS({ _id: 3 });

        const expectedState = prevState.set('isWatched', false);

        const currentState = sut(prevState, action);

        currentState.should.eqls(expectedState);
    });

    it('should add challenge to watchList', () => {
        const action = {
            type: ADDED_TO_WATCHLIST
        };
        const prevState = fromJS({ _id: 3 });
        const expectedState = prevState.set('isWatched', true);

        const currentState = sut(prevState, action);

        currentState.should.eqls(expectedState);
    });

    it('should add challenge to accepted list', () => {
        const action = {
            type: ADDED_TO_ACCEPTED_LIST
        };
        const prevState = fromJS({ _id: 3 });
        const expectedState = prevState.set('isAccepted', true);

        const currentState = sut(prevState, action);

        currentState.should.eqls(expectedState);
    });
});
