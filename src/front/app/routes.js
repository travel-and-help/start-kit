import React from 'react';
import { Route } from 'react-router';
import { IndexRoute } from 'react-router';
import Login from './features/auth/components/LoginScreenContainer';
import CategoryTileListContainer from './features/categories/components/CategoryTileListContainer';
import mainRoutes from './features/main/routes';
import ChallengeContainer from './features/challenge/components/ChallengeContainer';
import WatchListContainer from 'features/watchList/components/WatchListContainer';

export default () => (
    <Route path="/" >
        <IndexRoute component={Login} />
        {mainRoutes()}
        <Route path="categories" component={CategoryTileListContainer} />
        <Route path="challenge/:id" component={ChallengeContainer} />
        <Route path="watch-list" component={WatchListContainer} />
    </Route>
);
