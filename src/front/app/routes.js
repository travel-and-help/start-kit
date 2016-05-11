import React from 'react';
import { Route } from 'react-router';
import Login from './features/login';
import CategoryTileListContainer from './features/categories/components/CategoryTileListContainer';
import ChallengeScreenContainer from './features/challenges/components/ChallengeScreenContainer';
import TodoScreen from './features/todo/TodoScreen';
import Awards from './features/awards';
import Updates from './features/updates';
import Profile from './features/profile';
import CreateForm from './features/create/components/CreateForm';


export default () => (
    <Route path="/" >
        <Route path="login" component={Login} />
        <Route path="challenges" component={ChallengeScreenContainer} />
        <Route path="awards" component={Awards} />
        <Route path="updates" component={Updates} />
        <Route path="profile" component={Profile} />
        <Route path="todo" component={TodoScreen} />
        <Route path="categories" component={CategoryTileListContainer} />
        <Route path="create" component={CreateForm} />
    </Route>
);
