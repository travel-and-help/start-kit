import ProfileChallengeList from '../ProfileChallengeList';
import { connect } from 'react-redux';

const mapStateToProps = ({ createdChallenges }) => ({
    menuTitle: 'created',
    challenges: createdChallenges
});

export default connect(mapStateToProps)(ProfileChallengeList);
