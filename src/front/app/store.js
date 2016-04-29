import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { hashHistory } from 'react-router';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import challenges from './reducers/challenges';

export default () => {
    const state = createStore(
        combineReducers({
            challenges,
            routing: routerReducer
        }),
        compose(
            applyMiddleware(thunk),
            process.env.NODE_ENV === 'development' && window.devToolsExtension ?
                window.devToolsExtension() : f => f
        )
    );

    const history = syncHistoryWithStore(hashHistory, state);

    return {
        state,
        history
    };
};
