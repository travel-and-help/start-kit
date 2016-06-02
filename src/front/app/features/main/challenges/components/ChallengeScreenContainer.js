import { connect } from 'react-redux';
import { fetchChallenges } from '../challenges.actions';
import ChallengeScreen from './ChallengeScreen';

const mapStateToProps = ({ challenges }) => ({
    topChallenge: challenges.first(),
    challenges: challenges.slice(1)
});

const mapDispatchToProps = (dispatch) => ({
    getChallenges() {
        dispatch(fetchChallenges());
    },
    addToWatchList() {
        // TODO just to enable swipe
    },
    dismiss() {
        // TODO just to enable swipe
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeScreen);
