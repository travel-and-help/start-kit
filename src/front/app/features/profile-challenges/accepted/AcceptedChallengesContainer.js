import ProfileChallengeList from '../ProfileChallengeList';
import { connect } from 'react-redux';

const mapStateToProps = ({ acceptedChallenges }) => ({
    menuTitle: 'accepted',
    challenges: acceptedChallenges
});

export default connect(mapStateToProps)(ProfileChallengeList);
