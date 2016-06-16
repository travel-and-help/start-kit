import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
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

const mapStateToProps = ({ challenge, auth }) => (
    {
        challenge,
        userId: auth.get('userId')
    }
);

const mapDispatchToProps = dispatch => ({
    getChallenge: id => dispatch(fetchChallenge(id)),
    getWishList: () => dispatch(getWishList()),
    getUser: userId => dispatch(getUser(userId)),
    getAcceptedChallenges: userId => dispatch(getAcceptedChallenges(userId)),
    getInitialState: () => dispatch(resetState()),
    onWatchChallenge: challengeId => dispatch(watchChallenge(challengeId)),
    onAccept: challengeId => dispatch(acceptChallenge(challengeId)),
    onComplete: challengeId => hashHistory.push(`complete-challenge/${challengeId}`)
});

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
