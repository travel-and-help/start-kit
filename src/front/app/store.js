import { createStore, applyMiddleware, combineReducers } from 'redux';
import { hashHistory } from 'react-router';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import challenges from './reducers/challenges';
import { reducer as formReducer } from 'redux-form';

export default () => {
    const state = createStore(
        combineReducers({
            challenges,
            routing: routerReducer,
            form: formReducer
        }),
        applyMiddleware(thunk)
    );

    const history = syncHistoryWithStore(hashHistory, state);

    return {
        state,
        history
    };
};
