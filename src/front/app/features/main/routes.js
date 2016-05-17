import React from 'react';
import { Route, IndexRoute } from 'react-router';
import MainScreen from './MainScreen';
import Awards from './awards';
import Updates from './updates';
import Profile from './profile';
import ChallengeScreenContainer from './challenges/components/ChallengeScreenContainer';

export default () => (
    <Route path="main" component={MainScreen} >
        <IndexRoute component={ChallengeScreenContainer} />
        <Route path="challenges" component={ChallengeScreenContainer} />
        <Route path="awards" component={Awards} />
        <Route path="updates" component={Updates} />
        <Route path="profile" component={Profile} />
    </Route>
);
