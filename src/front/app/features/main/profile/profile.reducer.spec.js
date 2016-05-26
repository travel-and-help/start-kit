import { Map } from 'immutable';
import { GET_USER } from './profile.actions';
import sut from './profile.reducer';

describe('reducer/profile', () => {
    it('should handle initial state', () => {
        sut(undefined, {}).toJS().should.eqls({});
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

    it('should ignore unknown actionTypes', () => {
        const action = { type: 'unknownType' };
        const state = Map({a: 1});
        const currentState = sut(state, action);

        currentState.toJS().should.eqls(state.toJS());
    });
});
