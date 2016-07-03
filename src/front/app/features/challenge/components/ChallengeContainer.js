import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
    fetchChallenge,
    resetState,
    watchChallenge,
    acceptChallenge
} from '../challenge.actions';

import {
    load as getAcceptedChallenges
} from '../../profile-challenges/accepted/acceptedChallenges.actions';

import {
    load as getWishList
} from '../../profile-challenges/watch-list/watchList.actions';

import { load as loadProfile } from '../../main/profile/profile.actions';
import Challenge from './Challenge';

const mapStateToProps = ({ challenge, auth }) => ({
    challenge,
    canEdit: challenge.getIn(['user', '_id']) === auth.get('userId')
});

const mapDispatchToProps = dispatch => ({
    getChallenge: id => dispatch(fetchChallenge(id)),
    getWishList: () => dispatch(getWishList()),
    getUser: () => dispatch(loadProfile()),
    getAcceptedChallenges: () => dispatch(getAcceptedChallenges()),
    getInitialState: () => dispatch(resetState()),
    onWatchChallenge: challengeId => dispatch(watchChallenge(challengeId)),
    onAccept: challengeId => dispatch(acceptChallenge(challengeId)),
    onComplete: challengeId => dispatch(push(`complete-challenge/${challengeId}`)),
    onEdit: challengeId => dispatch(push(`/edit/${challengeId}`))
});

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
