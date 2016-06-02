import React from 'react';
import { Route } from 'react-router';
import WatchListContainer from './watch-list/WatchListContainer';

export default () => (
    <Route path="profile" >
        <Route path="watch-list" component={WatchListContainer} />
    </Route>
);
