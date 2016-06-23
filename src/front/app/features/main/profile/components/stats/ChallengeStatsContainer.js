import { connect } from 'react-redux';
import ChallengeStats from './ChallengeStats';

const mapStateToProps = ({
    createdChallenges,
    acceptedChallenges,
    completedChallenges
}) => ({
    createdCount: createdChallenges.size,
    acceptedCount: acceptedChallenges.size,
    completedCount: completedChallenges.size
});

export default connect(mapStateToProps)(ChallengeStats);
