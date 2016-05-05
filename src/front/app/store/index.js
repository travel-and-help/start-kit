import { createStore, combineReducers } from 'redux';
import { hashHistory } from 'react-router';
import storeEnhancers from './enhancers';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import challenges from '../features/challenges/challenges.reducer';
import categories from '../features/categories/categories.reducer';

export default () => {
    const state = createStore(
        combineReducers({
            challenges,
            categories,
            routing: routerReducer
        }),
        storeEnhancers
    );

    const history = syncHistoryWithStore(hashHistory, state);

    return {
        state,
        history
    };
};
