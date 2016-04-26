import React from 'react';
import { Router, Route, IndexRoute} from 'react-router';
import Login from './components/Login';
import Challenges from './components/Challenges';
import TodoScreen from './components/TodoScreen';
import Awards from './components/Awards';
import Updates from './components/Updates';
import Profile from './components/Profile';
import Layout from './components/Layout';

export default () => (
    <Route path="/" component={Layout}>
        <IndexRoute component={Login} />
        <Route path="login" component={Login} />
        <Route path="challenges" component={Challenges} />
        <Route path="awards" component={Awards} />
        <Route path="updates" component={Updates} />
        <Route path="profile" component={Profile} />
        <Route path="todo" component={TodoScreen} />
    </Route>
);
