import React from 'react';
import { Route } from 'react-router';
import WatchList from './watch-list/WatchListContainer';
import CreatedChallenges from './created/CreatedChallengesContainer';
import AcceptedChallenges from './accepted/AcceptedChallengesContainer';
import CompletedChallenges from './completed/CompletedChallengesContainer';

export default () => (
    <Route path="profile" >
        <Route path="watch-list" component={WatchList} />
        <Route path="created-challenges" component={CreatedChallenges} />
        <Route path="accepted-challenges" component={AcceptedChallenges} />
        <Route path="completed-challenges" component={CompletedChallenges} />
    </Route>
);
