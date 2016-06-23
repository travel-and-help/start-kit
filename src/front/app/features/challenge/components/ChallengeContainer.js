import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
    fetchChallenge,
    resetState,
    watchChallenge,
    acceptChallenge,
    getAcceptedChallenges,
    getWishList
} from '../challenge.actions';
import { getUser } from '../../main/profile/profile.actions';
import Challenge from './Challenge';

const mapStateToProps = ({ challenge, auth }) => {
    const userId = auth.get('userId');
    const canEdit = challenge.getIn(['user', '_id']) === userId;
    return {
        challenge,
        canEdit,
        userId
    };
};

const mapDispatchToProps = dispatch => ({
    getChallenge: id => dispatch(fetchChallenge(id)),
    getWishList: () => dispatch(getWishList()),
    getUser: userId => dispatch(getUser(userId)),
    getAcceptedChallenges: userId => dispatch(getAcceptedChallenges(userId)),
    getInitialState: () => dispatch(resetState()),
    onWatchChallenge: challengeId => dispatch(watchChallenge(challengeId)),
    onAccept: challengeId => dispatch(acceptChallenge(challengeId)),
    onComplete: challengeId => dispatch(push(`complete-challenge/${challengeId}`)),
    onEdit: challengeId => dispatch(push(`/edit/${challengeId}`))
});

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
