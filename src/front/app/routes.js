import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Login from './components/Login';
import Challenges from './components/Challenges';
import Awards from './components/Awards';
import Updates from './components/Updates';
import Profile from './components/Profile';
import WatchList from './components/WatchList';

export default () => (
    <Route path="/">
        <IndexRoute component={Login} />
        <Route path="challenges" component={Challenges} />
        <Route path="awards" component={Awards} />
        <Route path="updates" component={Updates} />
        <Route path="profile" component={Profile} />
        <Route path="watch-list" component={WatchList} />
    </Route>
);
