import { applyMiddleware, compose } from 'redux';
import { hashHistory } from 'react-router';

// Apply the middleware to the store
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

const router = routerMiddleware(hashHistory);
export default compose(
    applyMiddleware(thunk, router),
    process.env.NODE_ENV === 'development' && global.devToolsExtension ?
        global.devToolsExtension() : f => f
);
