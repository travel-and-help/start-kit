import React, { PropTypes } from 'react';

const ChallengeCount = ({ status, count = 0 }) => (
    <div className={`challenge-count challenge-count_${status}`} >
        <div className="challenge-count__value" >
            {count}
        </div>
        <span className="challenge-count__status">{status}</span>
    </div>
);

ChallengeCount.propTypes = {
    status: PropTypes.string.isRequired,
    count: PropTypes.number
};

export default ChallengeCount;
