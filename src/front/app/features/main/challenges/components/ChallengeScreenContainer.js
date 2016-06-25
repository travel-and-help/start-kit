import { connect } from 'react-redux';
import { fetchChallenges } from '../challenges.actions';
import ChallengeScreen from './ChallengeScreen';
import loadable from '../../../../common/components/loadable';

const mapStateToProps = ({ challenges }) => ({
    topChallenge: challenges.first(),
    challenges: challenges.slice(1)
});

const mapDispatchToProps = (dispatch) => ({
    onLoad() {
        dispatch(fetchChallenges());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(loadable(ChallengeScreen));
