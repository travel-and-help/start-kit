import { createStore, combineReducers } from 'redux';
import appReducer from './reducer/app';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

export default () => {
    const state = createStore(combineReducers({
        app: appReducer,
        routing: routerReducer,
        form: formReducer
    }));

    const history = syncHistoryWithStore(hashHistory, state);

    return {
        state,
        history
    };
};
