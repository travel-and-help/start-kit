import { connect } from 'react-redux';
import { fetchChallenges } from '../challenges.actions';
import ChallengeScreen from './ChallengeScreen';
import { Map } from 'immutable';

const mapStateToProps = ({ challenges }) => ({
    topChallenge: challenges.first(),
    challenges: challenges.slice(1)
});

const mapDispatchToProps = (dispatch) => ({
    getChallenges: () => dispatch(fetchChallenges()),
    leftSwipe: new Map({
        text: 'Add to watchlist',
        type: 'watch',
        action: () => {}
    }),
    rightSwipe: new Map({
        text: 'Dismiss',
        type: 'dismiss',
        action: () => {}
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeScreen);
