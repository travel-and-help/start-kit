import { List, fromJS } from 'immutable';
import { GET_CATEGORIES, WATCH_CATEGORY } from './categories.actions';
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

    it('should mark category with provided categoryId as checked', () => {
        const action = {
            type: WATCH_CATEGORY,
            categoryId: 1
        };

        const category = fromJS({
            checked: false,
            _id: 1
        });

        const state = List.of(category);
        const currentState = sut(state, action);

        currentState.toJS()[0].checked.should.eqls(true);
    });

    it('should not make any changes if categoryId does not match', () => {
        const action = {
            type: WATCH_CATEGORY,
            categoryId: 1
        };

        const category = fromJS({
            checked: false,
            _id: 2
        });

        const state = List.of(category);
        const currentState = sut(state, action);

        currentState.toJS()[0].checked.should.eqls(false);
    });
});
