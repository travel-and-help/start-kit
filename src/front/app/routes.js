import React from 'react';
import { Route } from 'react-router';
import Login from './components/Login';
import Challenges from './components/Challenges';
import THSplash from './components/THSplash';
import Create from './components/Create'

export default () => (
    <Route path="/">
        <Route path="login" component={Login} />
        <Route path="challenges" component={Challenges} />
        <Route path="awards" component={Awards} />
        <Route path="updates" component={Updates} />
        <Route path="profile" component={Profile} />
        <Route path="create" component={Create} />
        <Route path="thsplash" component={THSplash} />
        <Route path="todo" component={TodoScreen} />
    </Route>
);
