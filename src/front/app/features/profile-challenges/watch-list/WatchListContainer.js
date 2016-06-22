import { connect } from 'react-redux';
import WatchList from '../ProfileChallengeList';
import { getWatchedChallenges, unWatch, acceptChallenge } from './watchList.actions';
import { Map } from 'immutable';

const mapStateToProps = ({ watchList, auth }) => ({
    user: auth.get('userId'),
    menuTitle: 'watch list',
    challenges: watchList
});

const mapDispatchToProps = (dispatch) => ({
    getChallenges: () => dispatch(getWatchedChallenges()),
    leftSwipe: new Map({
        text: 'Accept',
        type: 'accept',
        action: challenge => dispatch(acceptChallenge(challenge))
    }),
    rightSwipe: new Map({
        text: 'Dismiss',
        type: 'dismiss',
        action: challenge => dispatch(unWatch(challenge))
    })
});


export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
