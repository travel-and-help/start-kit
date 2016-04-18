import React from 'react';
import Navigation from './../Navigation';
import WatchList from './WatchList';
import { hashHistory } from 'react-router';

export default () => (
    <div className="challenges">
        <div onClick={hashHistory.goBack}>&lt; Watch List</div>
        <WatchList />
        <Navigation />
    </div>
);
