import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Login from './components/login/Login';
import Challenges from './components/challenges';

export default () => (
    <Route path="/">
        <IndexRoute component={Login} />
        <Route path="challenges" component={Challenges} />
    </Route>
);
