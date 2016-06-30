import {
    load,
    navigate
} from '../../../../profile-challenges/profileChallenges.actions';

import loadable from '../../../../../common/components/loadable';
import { connect } from 'react-redux';
import ProfileChallenges from './ProfileChallenges';
import { Map } from 'immutable';
import { hashHistory } from 'react-router';

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
    },
    acceptedLeftSwipe: new Map({
        text: 'Complete',
        type: 'complete',
        action(challenge) {
            const challengeId = challenge.get('_id');
            hashHistory.push(`complete-challenge/${challengeId}`);
        }
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(loadable(ProfileChallenges));
