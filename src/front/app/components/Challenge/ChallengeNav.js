import React from 'react';

const goBack = () => (
    history.back()
);

export default () => (
    <div>
        <button onClick={goBack}>Back</button>
    </div>
);
