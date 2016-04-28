import { GET_CATEGORIES } from './../actions/categories';
import sut from './categories';

describe('reducer/categories', () => {
    it('should return current state if action.type is UNKNOWN', () => {
        const action = { type: 'unknownType' };
        const state = { categories: [] };
        const currentState = sut(state, action);

        currentState.should.eqls(state);
    });

    it('should return initial categories', () => {
        const action = {
            type: GET_CATEGORIES,
            categories: ['categories']
        };
        const prevState = { categories: [] };
        const expectedState = ['categories'];
        const currentState = sut(prevState, action);

        currentState.should.eqls(expectedState);
    });
});
