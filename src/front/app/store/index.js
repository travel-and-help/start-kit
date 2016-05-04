import { createStore, applyMiddleware, combineReducers } from 'redux';
import { hashHistory } from 'react-router';
import storeEnhancers from './enhancers';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import challenges from '../reducers/challenges';
import userReducer from '../reducers/user';
import categories from '../reducers/categories';

export default () => {
    const state = createStore(
        combineReducers({
            challenges,
            categories,
            routing: routerReducer,
            user: userReducer
        }),
        storeEnhancers
    );

    const history = syncHistoryWithStore(hashHistory, state);

    return {
        state,
        history
    };
};
