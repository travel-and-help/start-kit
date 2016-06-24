import {
    PROFILE_RECEIVED,
} from './profile.actions';

import sut from './profile.reducer';

describe('reducer/profile', () => {

    it('should handle initial state', () => {
        sut(undefined, {}).should.eqls({});
    });

    it('should ignore unknown actionTypes', () => {
        const action = { type: 'unknownType' };
        const state = { a: 1 };
        const currentState = sut(state, action);

        currentState.should.eqls(state);
    });

    it('should handle PROFILE_RECEIVED', () => {
        const action = {
            type: PROFILE_RECEIVED,
            profile: {
                name: 'mockName'
            }
        };

        sut(undefined, action).should.eqls(action.profile);
    });
});
