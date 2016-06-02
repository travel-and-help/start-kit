import { LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILED, LOGIN_SKIPPED } from './auth.actions';
import { fromJS } from 'immutable';
import sut from './auth.reducer';

describe('reducer/auth', () => {
    it('should handle initial state', () => {
        sut(undefined, {}).toJS().should.eqls({
            isLoggedIn: false
        });
    });

    it('should handle LOGIN_ATTEMPT', () => {
        const action = {
            type: LOGIN_ATTEMPT
        };
        const expectedState = {
            isLoggedIn: false,
            attempt: true
        };
        const currentState = sut(undefined, action);

        currentState.toJS().should.eqls(expectedState);
    });

    it('should handle LOGIN_SUCCESS', () => {
        const action = {
            type: LOGIN_SUCCESS,
            token: 'testtoken',
            userId: 'testUser'
        };
        const expectedState = {
            isLoggedIn: true,
            token: 'testtoken',
            userId: 'testUser'
        };
        const currentState = sut(undefined, action);
        currentState.toJS().should.eqls(expectedState);
    });

    it('should handle LOGIN_FAILED', () => {
        const action = {
            type: LOGIN_FAILED,
            info: 'testinfo'
        };
        const expectedState = {
            isLoggedIn: false,
            info: 'testinfo'
        };
        const currentState = sut(undefined, action);

        currentState.toJS().should.eqls(expectedState);
    });

    it('should handle LOGIN_SKIPPED', () => {
        const action = {
            type: LOGIN_SKIPPED
        };
        const expectedState = {
            skipped: true
        };
        const currentState = sut(undefined, action);

        currentState.toJS().should.eqls(expectedState);
    });

    it('should ignore unknown actionTypes', () => {
        const action = { type: 'unknownType' };
        const state = fromJS({});
        const currentState = sut(state, action);
        currentState.toJS().should.eqls(state.toJS());
    });
});
