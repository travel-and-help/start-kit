import { GET_CHALLENGE_TOPICS } from './../actions/challengeTopics';
import sut from './challengeTopics';

describe('reducer/challengeTopics', () => {
    it('should return current state if action.type is UNKNOWN', () => {
        const action = { type: 'unknownType' };
        const state = { challengeTopics: [] };
        const currentState = sut(state, action);

        currentState.should.eqls(state);
    });

    it('should return initial challenge topics', () => {
        const action = {
            type: GET_CHALLENGE_TOPICS,
            challengeTopics: ['challengeTopics']
        };
        const prevState = { challengeTopics: [] };
        const expectedState = ['challengeTopics'];
        const currentState = sut(prevState, action);

        currentState.should.eqls(expectedState);
    });
});
