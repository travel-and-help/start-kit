import { connect } from 'react-redux';
import { fetchChallenges } from '../challenges.actions';
import ChallengeScreen from './ChallengeScreen';

const mapStateToProps = ({ challenges }) => ({ challenges });

const mapDispatchToProps = (dispatch) => ({
    getChallenges: () => {
        dispatch(fetchChallenges());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeScreen);
