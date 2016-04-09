import React from 'react';
import { Route, IndexRoute } from 'react-router';
import TodoScreen from './components/screens/TodoScreen';
import LoginScreen from './components/screens/LoginScreen';

export default () => (
    <Route path="/">
        <IndexRoute component={LoginScreen} />
        <Route path="todo" component={TodoScreen} />
    </Route>
);
