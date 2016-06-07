import React from 'react';
import { Route } from 'react-router';
import MainScreen from './MainScreen';
import Awards from './awards';
import Updates from './updates';
import ProfileContainer from './profile/components/ProfileContainer';
import ChallengeScreenContainer from './challenges/components/ChallengeScreenContainer';

export default () => (
    <Route path="main" component={MainScreen} >
        <Route path="challenges" component={ChallengeScreenContainer} />
        <Route path="awards" component={Awards} />
        <Route path="updates" component={Updates} />
        <Route path="profile" component={ProfileContainer} />
    </Route>
);
