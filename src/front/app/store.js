import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import appReducer from './reducer/app';
import challengeReducer from './reducer/challenge';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

export default () => {
    const state = createStore(combineReducers({
        app: appReducer,
        routing: routerReducer,
        challenge: challengeReducer
    }), applyMiddleware(thunkMiddleware));

    const history = syncHistoryWithStore(hashHistory, state);

    return {
        state,
        history
    };
};
