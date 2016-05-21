import React from 'react';
import { Route } from 'react-router';
import { IndexRoute } from 'react-router';
import Login from './features/auth/components/login-screen-container';
import CategoryTileListContainer from './features/categories/components/CategoryTileListContainer';
import TodoScreen from './features/todo/TodoScreen';
import mainRoutes from './features/main/routes';

export default () => (
    <Route path="/" >
        <IndexRoute component={Login} />
        {mainRoutes()}
        <Route path="todo" component={TodoScreen} />
        <Route path="categories" component={CategoryTileListContainer} />
    </Route>
);
