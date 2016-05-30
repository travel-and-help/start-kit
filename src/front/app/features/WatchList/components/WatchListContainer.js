import { connect } from 'react-redux';
import WatchList from './WatchList';
import { getInitialChallenges, unWatch } from '../watchList.actions';

const mapStateToProps = ({ watchList }) => ({ challenges: watchList });

const mapDispatchToProps = (dispatch) => ({
    getInitialChallenges: () => dispatch(getInitialChallenges()),
    unWatchChallenge: challenge => dispatch(unWatch(challenge))
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
