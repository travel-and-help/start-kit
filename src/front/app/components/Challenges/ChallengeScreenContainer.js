import { connect } from 'react-redux';
import { fetchChallenges } from './../../actions/challenges';
import ChallengeScreen from './ChallengeScreen';

const mapStateToProps = ({ challenges }) => ({ challenges });

const mapDispatchToProps = (dispatch) => ({
    getChallenges: () => {
        dispatch(fetchChallenges());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeScreen);
