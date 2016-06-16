import { connect } from 'react-redux';
import WatchList from '../ProfileChallengeList';
import { getWatchedChallenges, unWatch, acceptChallenge } from './watchList.actions';
import { Map } from 'immutable';

const leftSwipeAction = new Map({
    text: 'Accept',
    type: 'accept'
});

const mapStateToProps = ({ watchList, auth }) => ({
    user: auth.get('userId'),
    menuTitle: 'watch list',
    challenges: watchList,
    leftSwipeAction
});

const mapDispatchToProps = (dispatch) => ({
    getChallenges: () => dispatch(getWatchedChallenges()),
    dismiss: challenge => dispatch(unWatch(challenge)),
    accept: leftSwipeAction.set('action', challenge => dispatch(acceptChallenge(challenge)))
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
