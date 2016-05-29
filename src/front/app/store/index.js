import { createStore, combineReducers } from 'redux';
import { hashHistory } from 'react-router';
import storeEnhancers from './enhancers';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import challenges from '../features/main/challenges/challenges.reducer';
import challenge from '../features/challenge/challenge.reducer';
import categories from '../features/categories/categories.reducer';
import auth from '../features/auth/auth.reducer';
import watchList from '../features/WatchList/watchList.reducer';

export default () => {
    const state = createStore(
        combineReducers({
            challenges,
            categories,
            challenge,
            routing: routerReducer,
            auth,
            watchList
        }),
        storeEnhancers
    );

    const history = syncHistoryWithStore(hashHistory, state);

    return {
        state,
        history
    };
};
