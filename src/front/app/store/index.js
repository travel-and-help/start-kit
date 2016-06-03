import { createStore, combineReducers } from 'redux';
import { hashHistory } from 'react-router';
import storeEnhancers from './enhancers';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import challenges from '../features/main/challenges/challenges.reducer';
import challenge from '../features/challenge/challenge.reducer';
import categories from '../features/categories/categories.reducer';
import auth from '../features/auth/auth.reducer';
import watchList from '../features/profile-challenges/watch-list/watchList.reducer';
import { reducer as formReducer } from 'redux-form';
import user from '../features/profile/profile.reducer';

export default () => {
    const state = createStore(
        combineReducers({
            challenges,
            categories,
            challenge,
            auth,
            watchList,
            user,
            routing: routerReducer,
            form: formReducer
        }),
        storeEnhancers
    );

    const history = syncHistoryWithStore(hashHistory, state);

    return {
        state,
        history
    };
};
