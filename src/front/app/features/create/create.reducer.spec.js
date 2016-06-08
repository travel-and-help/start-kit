import { Map } from 'immutable';
import { GET_CATEGORIES, POST_CHALLENGE } from './create.actions';
import sut from './create.reducer';

describe('reducer/create', () => {
    it('should handle initial state', () => {
        sut(undefined, {}).toJS().should.eqls({});
    });

    it('should handle GET_CATEGORIES', () => {
        const action = {
            type: GET_CATEGORIES,
            categories: ['categories']
        };
        const expectedState = {
            categories: ['categories']
        };

        const currentState = sut(undefined, action);

        currentState.toJS().should.eqls(expectedState);
    });

    it('should handle POST_CHALLENGE', () => {
        const action = {
            type: POST_CHALLENGE,
            challenge: { b: 1 }
        };
        const expectedState = {
            challenge: { b: 1 }
        };

        const currentState = sut(undefined, action);


        currentState.toJS().should.eqls(expectedState);
    });

    it('should ignore unknown actionTypes', () => {
        const action = { type: 'unknownType' };
        const state = new Map({ a: 1 });
        const currentState = sut(state, action);

        currentState.toJS().should.eqls(state.toJS());
    });
});
