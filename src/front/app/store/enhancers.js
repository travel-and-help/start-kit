import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

export default compose(
    applyMiddleware(thunk),
    process.env.NODE_ENV === 'development' && global.devToolsExtension ?
        global.devToolsExtension() : f => f
);
