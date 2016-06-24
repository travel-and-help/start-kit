import ProfileChallengeList from '../ProfileChallengeList';
import { connect } from 'react-redux';

const mapStateToProps = ({ completedChallenges }) => ({
    menuTitle: 'completed',
    challenges: completedChallenges
});

export default connect(mapStateToProps)(ProfileChallengeList);
