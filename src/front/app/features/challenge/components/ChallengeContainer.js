import { connect } from 'react-redux';
import { fetchChallenge, resetState, watchChallenge } from '../challenge.actions';
import Challenge from './Challenge';

const mapStateToProps = ({ challenge }) => ({ challenge });

const mapDispatchToProps = dispatch => ({
    getChallenge: id => dispatch(fetchChallenge(id)),
    getInitialState: () => dispatch(resetState()),
    onWatchChallenge: challengeId => dispatch(watchChallenge(challengeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
