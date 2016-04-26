import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import appStore from './store';
import routes from './routes';

export default () => {
    const store = appStore();
    const app = document.getElementById('root');
    render(
        <Provider store={store.state}>
            <Router history={store.history}>
                { routes() }
            </Router>
        </Provider>,
        app
    );
};
