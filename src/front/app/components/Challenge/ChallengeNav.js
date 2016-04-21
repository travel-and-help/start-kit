import React from 'react';
import { hashHistory } from 'react-router';

export default () => (
    <div>
        <button onClick={hashHistory.goBack}>Back</button>
        <button>Share</button>
    </div>
);
