import { createStore, combineReducers } from 'redux';
import { hashHistory } from 'react-router';
import storeEnhancers from './enhancers';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import challenges from '../features/challenges/challenges.reducer';
import categories from '../features/categories/categories.reducer';
import { reducer as formReducer } from 'redux-form';
import user from '../features/profile/profile.reducer';

export default () => {
    const state = createStore(
        combineReducers({
            challenges,
            categories,
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
