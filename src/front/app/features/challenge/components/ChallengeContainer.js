import { connect } from 'react-redux';
import {
    fetchChallenge,
    resetState,
    watchChallenge,
    acceptChallenge,
    getAcceptedChallenges,
    userReceived,
    getWishList
} from '../challenge.actions';
import { getUser } from '../../main/profile/profile.actions';
import Challenge from './Challenge';

const mapStateToProps = ({ challenge, auth, user }) => (
    {
        user,
        challenge,
        userId: auth.get('userId')
    }
);

const mapDispatchToProps = dispatch => ({
    getChallenge: id => dispatch(fetchChallenge(id)),
    getWishList: userId => dispatch(getWishList(userId)),
    getUser: userId => dispatch(getUser(userId)),
    getAcceptedChallenges: userId => dispatch(getAcceptedChallenges(userId)),
    userReceived: user => dispatch(userReceived(user)),
    getInitialState: () => dispatch(resetState()),
    onWatchChallenge: challengeId => dispatch(watchChallenge(challengeId)),
    onAccept: challengeId => dispatch(acceptChallenge(challengeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
