import sut from './challenges.reducer.js';
import { List } from 'immutable';
import { GET_CHALLENGES } from './challenges.actions.js';

describe('reducer/challenges', () => {
    it('should handle initial state', () => {
        sut(undefined, {}).toJS().should.eqls([]);
    });

    it('should add initial challenges to state', () => {
        const action = {
            type: GET_CHALLENGES,
            challenges: [1, 2, 3]
        };
        const expectedState = [1, 2, 3];

        const currentState = sut(undefined, action);

        currentState.toJS().should.eqls(expectedState);
    });

    it('should ignore unknown actionTypes', () => {
        const action = { type: 'unknownType' };
        const prevState = List.of(1, 2);
        const currentState = sut(prevState, action);

        currentState.toJS().should.eqls(prevState.toJS());
    });

});
