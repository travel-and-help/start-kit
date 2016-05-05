import freeze from 'deep-freeze';
import sut from './user';
import { GET_USER } from './../actions/user';

describe('reducer/user', () => {
    it('should NOT change state if action.type is UNKNOWN', () => {
        const action = { type: 'unknownType' };
        const prevState = { user: {} };
        const currentState = sut(prevState, action);

        currentState.should.eqls(prevState);
    });

    it('should add initial user to state', () => {
        const action = {
            type: GET_USER,
            user: {
                name: 'some name'
            }
        };
        const prevState = { user: {} };
        const expectedState = {
            user: {
                name: 'some name'
            }
        };

        freeze(prevState);
        const currentState = sut(prevState, action);

        currentState.should.eqls(expectedState);
    });

});
