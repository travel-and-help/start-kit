import { connect } from 'react-redux';
import WatchList from '../ProfileChallengeList';
import { unWatch, acceptChallenge } from './watchList.actions';
import { Map } from 'immutable';

const mapStateToProps = ({ watchList }) => ({
    menuTitle: 'watch list',
    challenges: watchList
});

const mapDispatchToProps = (dispatch) => ({
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
