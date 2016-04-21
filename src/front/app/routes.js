import React from 'react';
import { Route } from 'react-router';
import Login from './components/Login';
import Challenges from './components/Challenges';
import Challenge from './components/Challenge';
import THSplash from './components/THSplash';

export default () => (
    <Route path="/" >
        <Route path="login" component={Login} />
        <Route path="challenges" component={Challenges} />
        <Route path="challenge/:id" component={Challenge} />
    </Route>
);
