import React from 'react';
import Login from './components/Login';
import Challenges from './components/Challenges';
import { Route } from 'react-router';
import TodoScreen from './components/TodoScreen';

export default () => (
    <Route path="/" >
        <Route path="login" component={Login} />
        <Route path="challenges" component={Challenges} />
        <Route path="todo" component={TodoScreen} />
    </Route>
);
