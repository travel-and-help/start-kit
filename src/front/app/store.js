import { createStore, combineReducers } from 'redux';
import appReducer from './reducer/app';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

export default () => {
    const state = createStore(combineReducers({
        app: appReducer,
        routing: routerReducer
    }));

    const history = syncHistoryWithStore(browserHistory, state);

    return {
        state,
        history
    };
};
