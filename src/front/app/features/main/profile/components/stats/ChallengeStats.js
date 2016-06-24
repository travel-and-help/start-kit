import React, { PropTypes } from 'react';
import ChallengeCount from './ChallengeCount';
import { CREATED, ACCEPTED, COMPLETED } from '../../../../profile-challenges/challengeStatus';

const ChallengeStats = ({
    createdCount,
    completedCount,
    acceptedCount
}) => (
    <div className="challenge-stats" >
        <ChallengeCount
            status={CREATED}
            count={createdCount}
        />

        <ChallengeCount
            status={ACCEPTED}
            count={acceptedCount}
        />

        <ChallengeCount
            status={COMPLETED}
            count={completedCount}
        />
    </div>
);

ChallengeStats.propTypes = {
    createdCount: PropTypes.number.isRequired,
    completedCount: PropTypes.number.isRequired,
    acceptedCount: PropTypes.number.isRequired
};

export default ChallengeStats;
