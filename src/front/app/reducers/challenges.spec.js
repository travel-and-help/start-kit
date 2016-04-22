import freeze from 'deep-freeze';
import sut from './challenges';
import { GET_CHALLENGES } from './../actions/challenges';

describe('reducer/challenges', () => {
    it('should NOT change state if action.type is UNKNOWN', () => {
        const action = { type: 'unknownType' };
        const prevState = { challenges: [] };
        const currentState = sut(prevState, action);

        currentState.should.eqls(prevState);
    });

    it('should add initial challenges to state', () => {
        const action = {
            type: GET_CHALLENGES,
            challenges: [1, 2, 3]
        };
        const prevState = { challenges: [] };
        const expectedState = [1, 2, 3];

        freeze(prevState);
        const currentState = sut(prevState, action);

        currentState.should.eqls(expectedState);
    });

});
