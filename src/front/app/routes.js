import React from 'react';
import { Route } from 'react-router';
import { IndexRoute } from 'react-router';
import Login from './features/auth/components/LoginScreenContainer';
import CategoryTileListContainer from './features/categories/components/CategoryTileListContainer';
import mainRoutes from './features/main/routes';
import profileRoutes from './features/profile-challenges/routes';
import ChallengeContainer from './features/challenge/components/ChallengeContainer';
import CreateFormContainer from './features/create/components/CreateFormContainer';
import CompleteChallenge from
    './features/challenge/components/complete/CompleteChallenge';

export default () => (
    <Route path="/" >
        <IndexRoute component={Login} />
        {mainRoutes()}
        {profileRoutes()}
        <Route path="categories" component={CategoryTileListContainer} />
        <Route path="challenge/:id" component={ChallengeContainer} />
        <Route path="create" component={CreateFormContainer} />
        <Route path="edit/:challengeId" component={CreateFormContainer} />
        <Route path="complete-challenge/:id" component={CompleteChallenge} />
    </Route>
);
