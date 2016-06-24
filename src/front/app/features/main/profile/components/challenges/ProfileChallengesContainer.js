import {
    load,
    navigate
} from '../../../../profile-challenges/profileChallenges.actions';

import loadable from '../../../../../common/components/loadable';
import { connect } from 'react-redux';
import ProfileChallenges from './ProfileChallenges';

const mapStateToProps = ({ createdChallenges, acceptedChallenges, completedChallenges }) => ({
    created: createdChallenges.take(3),
    accepted: acceptedChallenges.take(3),
    completed: completedChallenges.take(3)
});

const mapDispatchToProps = (dispatch) => ({
    onLoad() {
        dispatch(load());
    },
    onShowAllClick(type) {
        dispatch(navigate(type));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(loadable(ProfileChallenges));
