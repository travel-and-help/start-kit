import { createStore, combineReducers } from 'redux';
import { hashHistory } from 'react-router';
import storeEnhancers from './enhancers';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import challenges from '../features/main/challenges/challenges.reducer';
import categories from '../features/categories/categories.reducer';
import auth from '../features/auth/auth.reducer';
import user from '../features/profile/profile.reducer';

export default () => {
    const state = createStore(
        combineReducers({
            challenges,
            categories,
            routing: routerReducer,
            auth,
            user
        }),
        storeEnhancers
    );

    const history = syncHistoryWithStore(hashHistory, state);

    return {
        state,
        history
    };
};
