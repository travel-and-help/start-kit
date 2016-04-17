import React from 'react';
import { Route } from 'react-router';
import Login from './components/Login';
import Challenges from './components/Challenges';
import THSplash from './components/THSplash';
import Create from './components/Create'

export default () => (
    <Route path="/" component={THSplash} >
        <Route path="login" component={Login} />
        <Route path="challenges" component={Challenges} />
        <Route path="create" component={Create} />
    </Route>
);
