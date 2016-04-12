import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Login from './components/Login';
import Challenges from './components/Challenges';

export default () => (
    <Route path="/">
        <IndexRoute component={Login} />
        <Route path="challenges" component={Challenges} />
    </Route>
);
