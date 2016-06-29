import ProfileChallengeList from '../ProfileChallengeList';
import { load } from './acceptedChallenges.actions';
import loadable from '../../../common/components/loadable';
import { connect } from 'react-redux';

const mapStateToProps = ({ acceptedChallenges }) => ({
    menuTitle: 'accepted',
    challenges: acceptedChallenges
});

const mapDispatchToProps = (dispatch) => ({
    onLoad() {
        dispatch(load());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(loadable(ProfileChallengeList));
