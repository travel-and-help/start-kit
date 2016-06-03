import { Map } from 'immutable';
import {
    GET_USER,
    CREATED_CHALLENGES_RECEIVED,
    ACCEPTED_CHALLENGES_RECEIVED,
    COMPLETED_CHALLENGES_RECEIVED
} from './profile.actions';
import sut from './profile.reducer';

describe('reducer/profile', () => {
    const challenges = [1, 2, 3];
    it('should handle initial state', () => {
        sut(undefined, {}).toJS().should.eqls({});
    });

    it('should ignore unknown actionTypes', () => {
        const action = { type: 'unknownType' };
        const state = new Map({ a: 1 });
        const currentState = sut(state, action);

        currentState.toJS().should.eqls(state.toJS());
    });

    it('should handle GET_USER', () => {
        const action = {
            type: GET_USER,
            user: {
                name: 'mockName'
            }
        };
        const expectedState = {
            name: 'mockName'
        };
        const currentState = sut(undefined, action);

        currentState.toJS().should.eqls(expectedState);
    });

    it('should handle CREATED_CHALLENGES_RECEIVED', () => {
        const action = {
            type: CREATED_CHALLENGES_RECEIVED,
            challenges
        };

        const expectedState = {
            createdChallenges: challenges
        };
        const currentState = sut(undefined, action);

        currentState.toJS().should.eqls(expectedState);
    });

    it('should handle ACCEPTED_CHALLENGES_RECEIVED', () => {
        const action = {
            type: ACCEPTED_CHALLENGES_RECEIVED,
            challenges
        };

        const expectedState = {
            acceptedChallenges: challenges
        };
        const currentState = sut(undefined, action);

        currentState.toJS().should.eqls(expectedState);
    });

    it('should handle COMPLETED_CHALLENGES_RECEIVED', () => {
        const action = {
            type: COMPLETED_CHALLENGES_RECEIVED,
            challenges
        };

        const expectedState = {
            completedChallenges: challenges
        };
        const currentState = sut(undefined, action);

        currentState.toJS().should.eqls(expectedState);
    });
});
