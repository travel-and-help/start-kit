import sut from './challenge.reducer';
import { Map } from 'immutable';
import { GET_CHALLENGE } from './challenge.actions';

describe('reducer/challenge', () => {
    it('should handle initial state', () => {
        sut(undefined, {}).toJS().should.eqls({});
    });

    it('should add challenge to state', () => {
        const action = {
            type: GET_CHALLENGE,
            challenge: {'1':'1', '2':'2', '3':'3'}
        };
        const expectedState = {'1':'1', '2':'2', '3':'3'};

        const currentState = sut(undefined, action);

        currentState.toJS().should.eqls(expectedState);
    });

    it('should ignore unknown actionTypes', () => {
        const action = { type: 'unknownType' };
        const prevState = Map({'1':'1', '2':'2'});
        const currentState = sut(prevState, action);

        currentState.toJS().should.eqls(prevState.toJS());
    });

});
