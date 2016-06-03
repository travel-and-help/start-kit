import { connect } from 'react-redux';
import WatchList from '../ProfileChallengeList';
import { getWatchedChallenges, unWatch } from './watchList.actions';

const mapStateToProps = ({ watchList }) => ({
    menuTitle: 'watch list',
    challenges: watchList
});

const mapDispatchToProps = (dispatch) => ({
    getChallenges: () => dispatch(getWatchedChallenges()),
    dismiss: challenge => dispatch(unWatch(challenge))
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
