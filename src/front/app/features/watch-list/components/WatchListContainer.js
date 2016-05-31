import { connect } from 'react-redux';
import WatchList from './WatchList';
import { getWatchedChallenges, unWatch } from '../watchList.actions';

const mapStateToProps = ({ watchList }) => ({ challenges: watchList });

const mapDispatchToProps = (dispatch) => ({
    getWatchedChallenges: () => dispatch(getWatchedChallenges()),
    unWatchChallenge: challenge => dispatch(unWatch(challenge))
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
