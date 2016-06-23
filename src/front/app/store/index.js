import { createStore, combineReducers } from 'redux';
import historyImpl from './history';
import storeEnhancers from './enhancers';
import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux';
import challenges from '../features/main/challenges/challenges.reducer';
import challenge from '../features/challenge/challenge.reducer';
import categories from '../features/categories/categories.reducer';
import auth from '../features/auth/auth.reducer';
import profile from '../features/main/profile/profile.reducer';
import profileChallenges from '../features/profile-challenges/profileChallenges.store';
import { reducer as form } from 'redux-form';

export default () => {
    const state = createStore(
        combineReducers({
            ...profileChallenges,
            challenges,
            categories,
            challenge,
            auth,
            form,
            profile,
            routing
        }),
        storeEnhancers
    );

    const history = syncHistoryWithStore(historyImpl, state);

    return {
        state,
        history
    };
};
