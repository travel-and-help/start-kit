import React from 'react';
import { hashHistory } from 'react-router';

export default () => (
    <div>
        <button>Share</button>
        <button onClick={hashHistory.goBack}>Back</button>
    </div>
);
