import React from 'react';
import { Route } from 'react-router';
import Login from './components/Login';
import Challenges from './components/Challenges';
import THSplash from './components/THSplash';
import ChallengeDetail from './components/ChallengeDetail/ChallengeDetail';

export default () => (
    <Route path="/" >
        <Route path="login" component={Login} />
        <Route path="challenges" component={Challenges} />
        <Route path="challengedetail" component={ChallengeDetail} />
        <Route path="thsplash" component={THSplash} />
    </Route>
);
