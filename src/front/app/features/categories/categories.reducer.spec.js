import { List } from 'immutable';
import { GET_CATEGORIES } from './categories.actions';
import sut from './categories.reducer';

describe('reducer/categories', () => {
    it('should handle initial state', () => {
        sut(undefined, {}).toJS().should.eqls([]);
    });

    it('should handle GET_CATEGORIES', () => {
        const action = {
            type: GET_CATEGORIES,
            categories: ['categories']
        };
        const expectedState = ['categories'];
        const currentState = sut(undefined, action);

        currentState.toJS().should.eqls(expectedState);
    });

    it('should ignore unknown actionTypes', () => {
        const action = { type: 'unknownType' };
        const state = List.of(1, 2);
        const currentState = sut(state, action);

        currentState.toJS().should.eqls(state.toJS());
    });
});
