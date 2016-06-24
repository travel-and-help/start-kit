import sut from './completedChallenges.reducer';
import { COMPLETED_CHALLENGES_RECEIVED } from './completedChallenges.actions';
import { List, fromJS } from 'immutable';

describe('acceptedChallenges.reducer', () => {
    it('should be empty list on initial state', () => sut(undefined, {}).toJS().should.eql([]));

    it('should be a List on initial state', () => sut(undefined, {}).should.be.instanceOf(List));

    it('handles CREATED_CHALLENGES_RECEIVED', () => {
        const action = {
            type: COMPLETED_CHALLENGES_RECEIVED,
            challenges: ['watch list']
        };
        sut(undefined, action).should.eql(fromJS(action.challenges));
    });

    it('ignores unknown actionTypes', () => {
        const action = { type: 'unknownType' };
        const state = List.of('something', 'interesting');
        sut(state, action).toJS().should.eql(state.toJS());
    });
});
